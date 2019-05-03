import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { Select } from '../index';

const defaultProps = {
    input: { value: '1' },
    label: 'label',
    type: 'text',
    meta: { touched: false, error: false },
    children: (
      <>
        <option value="1">1</option>
      </>
    )
  },
  TestSelect = (props: any) => <Select {...defaultProps} {...props} />;

describe('Render DateInput', () => {
  it('render correctly date component', () => {
    const SelectInputComponent = renderer.create(<TestSelect />).toJSON();
    expect(SelectInputComponent).toMatchSnapshot();
  });
});
