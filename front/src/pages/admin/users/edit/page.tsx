import React from 'react';
import {
  Column
  //@ts-ignore
} from 'styled-bootstrap-components';
import { User } from '../../../../store/ducks/users/types';
import {
  ContainerFull,
  RowCentered
} from '../../../../components/layout/Forms/Layouts';
import EditUserForm from '../../../../forms/EditUserForm';
import { submit } from '../../../../store/utils/formUtils';

const EditUserPage = ({
  user,
  editUser
}: {
  user?: User;
  editUser: Function;
}) => (
  <ContainerFull fluid>
    <RowCentered>
      <Column>
        <h2>Edit User</h2>
        {user && (
          <EditUserForm
            onSubmit={submit(editUser)}
            initialValues={{
              username: user!.username,
              email: user!.email,
              role: user!.role,
              id: user!.id
            }}
          />
        )}
      </Column>
    </RowCentered>
  </ContainerFull>
);

export default EditUserPage;
