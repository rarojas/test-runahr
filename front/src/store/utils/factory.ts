import {
  Action,
  Factory,
  Statuses,
  AsynchronousCreator,
  Properties,
  Indexed
} from './factory.types';

export default {
  /**
   *
   * @param type
   */
  synchronous<T>(type: string) {
    const assign = Object.assign;
    function creator<T>(payload?: T, meta?: any): Action<T> {
      return {
        type,
        payload,
        meta
      };
    }
    return assign(creator, { type });
  },
  /**
   *
   */
  asynchronous<T>(base: string) {
    function creator<T>(payload?: T, meta?: any): Action<T> {
      return {
        type: base + Statuses.request,
        payload,
        meta
      };
    }

    const { assign, entries } = Object;
    const creators = entries(Properties).reduce(
      (creators: Indexed, [key, value]) => {
        const status: Statuses = Statuses[key as keyof typeof Statuses];
        const type = base + status;
        creators[value] = this.synchronous<T>(type);
        return creators;
      },
      {}
    ) as AsynchronousCreator<T>;

    return assign(creator, creators, { type: base + Statuses.request });
  }
} as Factory;
