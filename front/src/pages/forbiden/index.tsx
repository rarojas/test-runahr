import React from 'react';
import {
  Column
  //@ts-ignore
} from 'styled-bootstrap-components';
import {
  ContainerFull,
  RowCentered
} from '../../components/layout/Forms/Layouts';

const Forbiden = () => (
  <ContainerFull fluid>
    <RowCentered>
      <Column sm={6}>
        <h2>Forbiden</h2>
      </Column>
    </RowCentered>
  </ContainerFull>
);

export default Forbiden;
