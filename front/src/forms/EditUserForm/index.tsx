import React from 'react';
import { reduxForm } from 'redux-form';
import { UserForm } from '../AddUserForm';

const EditUserForm = (props: any) => (
  <UserForm {...props} submitText="Edit User" />
);

export default reduxForm({
  form: 'editUser',
  enableReinitialize: true
})(EditUserForm);
