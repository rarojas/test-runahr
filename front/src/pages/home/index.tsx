import React from 'react';
import {
  Column
  //@ts-ignore
} from 'styled-bootstrap-components';
import {
  ContainerFull,
  RowCentered
} from '../../components/layout/Forms/Layouts';
import { User } from '../../store/ducks/users/types';

const HomePage = ({ user }: { user: User }) => (
  <ContainerFull fluid>
    <RowCentered>
      <Column sm={6}>
        <h2>Home</h2>
        <h2>Welcome: {user.username}</h2>
      </Column>
    </RowCentered>
  </ContainerFull>
);

export default HomePage;
