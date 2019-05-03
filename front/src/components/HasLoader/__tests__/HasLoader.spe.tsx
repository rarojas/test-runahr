import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import HasLoader from '../index';
import {
  Button
  //@ts-ignore
} from 'styled-bootstrap-components';

const TestHasLoader = HasLoader(Button);

const defaultProps = {
    loading: false
  },
  EnchancedComponent = (props: any) => (
    <TestHasLoader {...defaultProps} {...props} />
  );

describe('Render DateInput', () => {
  it('render correctly date component', () => {
    const DateInputComponent = renderer.create(<EnchancedComponent />).toJSON();
    expect(DateInputComponent).toMatchSnapshot();
  });

  it('render date input correctly with empty value', () => {
    const props = {
        loading: true
      },
      DateInputComponent = mount(<EnchancedComponent {...props} />);
    expect(DateInputComponent.prop('loading')).toEqual(true);
  });
});
