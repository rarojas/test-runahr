import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { TextInput } from '../index';

const defaultProps = {
    input: { value: 'value' },
    label: 'label',
    type: 'text',
    meta: { touched: false, error: false }
  },
  TestTextInput = (props: any) => <TextInput {...defaultProps} {...props} />;

describe('Render TextInput', () => {
  it('render correctly component', () => {
    const TextInputComponent = renderer.create(<TestTextInput />).toJSON();
    expect(TextInputComponent).toMatchSnapshot();
  });
});
