import {
  Row,
  Container
  //@ts-ignore
} from 'styled-bootstrap-components';
import styled from 'styled-components';

export const RowCentered = styled(Row)`
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const ContainerFull = styled(Container)`
  display: flex;
  flex: 1;
`;
