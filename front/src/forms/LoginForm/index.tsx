import React from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import {
  Button,
  FormGroup
  //@ts-ignore
} from 'styled-bootstrap-components';
import { TextInput } from '../../components/layout/TextInput';
import { required } from '../FieldLevelValidationForm';

const LoginForm = ({ handleSubmit, error }: InjectedFormProps) => (
  <form onSubmit={handleSubmit}>
    <FormGroup>
      <Field
        name="username"
        component={TextInput}
        type="text"
        label="Username"
        validate={[required]}
      />
    </FormGroup>
    <FormGroup>
      <Field
        name="password"
        component={TextInput}
        type="password"
        label="Password"
        validate={[required]}
      />
    </FormGroup>
    {error}
    <Button block primary type="submit">
      Login
    </Button>
  </form>
);

export default reduxForm({
  form: 'login'
})(LoginForm);
