import React from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import {
  Button,
  FormGroup
  //@ts-ignore
} from 'styled-bootstrap-components';
import { TextInput } from '../../components/layout/TextInput';

const AddUserForm = ({ handleSubmit, error }: InjectedFormProps) => (
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
    {error}
    <Button block primary type="submit">
      Add User
    </Button>
  </form>
);

export default reduxForm({
  form: 'addUser',
  enableReinitialize: true
})(AddUserForm);
