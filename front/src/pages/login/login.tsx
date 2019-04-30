import React from 'react';
import LoginForm from '../../forms/LoginForm';
import {
  Column
  //@ts-ignore
} from 'styled-bootstrap-components';
import { submit } from '../../store/utils/formUtils';
import {
  ContainerFull,
  RowCentered
} from '../../components/layout/Forms/Layouts';

const LoginPage = ({
  login,
  loading
}: {
  login: Function;
  loading: boolean;
}) => (
  <ContainerFull fluid>
    <RowCentered>
      <Column sm={6}>
        <h2>Login</h2>
        <LoginForm onSubmit={submit(login)} />
      </Column>
    </RowCentered>
  </ContainerFull>
);

export default LoginPage;
