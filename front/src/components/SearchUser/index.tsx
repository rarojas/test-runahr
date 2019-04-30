import React from 'react';
import {
  FormControl
  //@ts-ignore
} from 'styled-bootstrap-components';
import { Subject } from 'rxjs';
import { from } from 'rxjs';
import {
  map,
  debounceTime,
  filter,
  distinctUntilChanged,
  switchMap,
  mergeMap
} from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { authenticated } from '../../store/ducks/users/operations';

interface State {
  text: string;
}
interface Props {
  onResult: Function;
}

export default class SearchUser extends React.Component<Props, State> {
  state: State = {
    text: ''
  };

  inputStream = new Subject();

  componentDidMount() {
    this.initializeInputStream();
  }

  initializeInputStream = () => {
    const { onResult } = this.props;
    this.inputStream
      .pipe(
        map((e: any) => e.target.value),
        debounceTime(250),
        filter(query => query.length >= 2 || query.length === 0),
        distinctUntilChanged(),
        map(value => ({ value })),
        mergeMap(authenticated),
        switchMap(({ headers, value }: any) =>
          value
            ? ajax
                .get('http://localhost:4000/api/user/search?search=' + value, headers)
                .pipe(map(({ response }: any) => response))
            : from(Promise.resolve([]))
        )
      )
      .subscribe(users => onResult(users));
  };

  componentWillUnmount() {
    this.inputStream.unsubscribe();
  }

  render() {
    return <FormControl onChange={(e: any) => this.inputStream.next(e)} />;
  }
}
