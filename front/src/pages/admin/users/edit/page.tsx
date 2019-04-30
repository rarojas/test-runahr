import React from 'react';
import {
  Column
  //@ts-ignore
} from 'styled-bootstrap-components';
import AddUserForm from '../../../../forms/AddUserForm';
import { User } from '../../../../store/ducks/users/types';
import {
  ContainerFull,
  RowCentered
} from '../../../../components/layout/Forms/Layouts';

const EditUserPage = ({ user }: { user?: User }) => (
  <ContainerFull fluid>
    <RowCentered>
      <Column>
        <h2>Edit User</h2>
        {user && (
          <AddUserForm
            initialValues={{
              username: user!.username,
              email: user!.email,
              role: user!.role
            }}
          />
        )}
      </Column>
    </RowCentered>
  </ContainerFull>
);

export default EditUserPage;
