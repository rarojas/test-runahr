import React from 'react';
import { Field, reduxForm, InjectedFormProps, submit } from 'redux-form';
import {
  Button,
  FormGroup
  //@ts-ignore
} from 'styled-bootstrap-components';
import { TextInput, Select } from '../../components/layout/TextInput';
import { PropsForm } from './types';

export const UserForm = ({
  handleSubmit,
  error,
  submitText = 'Add User'
}: InjectedFormProps<{}, PropsForm, string> & PropsForm) => (
  <form onSubmit={handleSubmit}>
    <FormGroup>
      <Field
        name="username"
        component={TextInput}
        type="text"
        label="Username"
      />
    </FormGroup>
    <FormGroup>
      <Field name="email" component={TextInput} type="text" label="Email" />
    </FormGroup>
    <FormGroup>
      <Field
        name="password"
        component={TextInput}
        type="password"
        label="Password"
      />
    </FormGroup>
    <FormGroup>
      <Field name="role" component={Select} type="text" label="Role">
        <option value="employe">Employe</option>
        <option value="admin">Admin</option>
      </Field>
    </FormGroup>
    {error}
    <Button block primary type="submit">
      {submitText}
    </Button>
  </form>
);

export default reduxForm<{}, PropsForm, string>({
  form: 'addUser',
  enableReinitialize: true
})(UserForm);
