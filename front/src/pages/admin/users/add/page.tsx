import React from 'react';
import {
  Column
  //@ts-ignore
} from 'styled-bootstrap-components';
import AddUserForm from '../../../../forms/AddUserForm';
import { submit } from '../../../../store/utils/formUtils';
import {
  ContainerFull,
  RowCentered
} from '../../../../components/layout/Forms/Layouts';

const AddUserPage = ({ addUser }: { addUser: Function }) => (
  <ContainerFull>
    <RowCentered>
      <Column>
        <h2>Add User</h2>
        <AddUserForm onSubmit={submit(addUser)} />
      </Column>
    </RowCentered>
  </ContainerFull>
);

export default AddUserPage;
