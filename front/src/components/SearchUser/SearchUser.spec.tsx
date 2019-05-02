import React from 'react';
import { shallow } from 'enzyme';
import SearchUser from './';

it('renders welcome message', () => {
  const wrapper = shallow(<SearchUser />);
  expect(wrapper).toHaveLength(1);
});
