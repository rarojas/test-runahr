import React from 'react';
import { Field, reduxForm, InjectedFormProps, submit } from 'redux-form';
import {
  Button,
  FormGroup
  //@ts-ignore
} from 'styled-bootstrap-components';
import { TextInput, Select } from '../../components/layout/TextInput';
import { PropsForm } from './types';
import { required, email } from '../FieldLevelValidationForm';

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
        validate={[required]}
      />
    </FormGroup>
    <FormGroup>
      <Field
        name="email"
        component={TextInput}
        type="text"
        label="Email"
        validate={[required, email]}
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
    <FormGroup>
      <Field
        name="role"
        component={Select}
        type="text"
        label="Role"
        validate={[required]}
      >
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
