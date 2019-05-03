import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import SearchUser from '..';

let wrapper: ReactWrapper<SearchUser['props']>;

beforeEach(() => {
  wrapper = mount(<SearchUser />);
});

describe('<SearchUser /> rendering', () => {
  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render one <input>', () => {
    expect(wrapper.find('input')).toHaveLength(1);
  });
});

describe('<SearchUser /> interactions', () => {
  it('should change the state test when onChange', () => {
    const onResult = jest.fn();
    wrapper.setProps({ onResult });
    wrapper.find('input').simulate('change', { target: { value: 'text' } });
    setTimeout(() => expect(onResult).toHaveBeenCalledWith([]), 300);
  });
});
