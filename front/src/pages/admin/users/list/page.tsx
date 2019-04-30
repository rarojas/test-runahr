import React, { lazy } from 'react';
import {
  Column,
  Button,
  Table,
  Tr
  //@ts-ignore
} from 'styled-bootstrap-components';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import { User } from '../../../../store/ducks/users/types';
import { List } from 'immutable';
import {
  ContainerFull,
  RowCentered
} from '../../../../components/layout/Forms/Layouts';
import styled from 'styled-components';
import ReactTable, { Column as TableColumn } from 'react-table';

const Wrapper = styled.div`
  flex: 1;
  overflow-y: scroll;
`;

const columns: Array<TableColumn> = [
  {
    Header: 'Username',
    accessor: 'username',
    Cell: (props: any) => <span>{props.value}</span>
  },
  {
    Header: 'Email',
    accessor: 'email',
    Cell: (props: any) => <span>{props.value}</span>
  },
  {
    Header: 'Role',
    accessor: 'role',
    Cell: (props: any) => <span>{props.value}</span>
  },
  {
    Header: 'Actions',
    accessor: 'id',
    Cell: (props: any) => (
      <Link to={`/users/edit/${props.value}`}>
        <Button primary>Editar</Button>
      </Link>
    )
  }
];

const AddUser = lazy(() => import('../../../admin/users/add'));
const EditUser = lazy(() => import('../../../admin/users/edit'));

class ListUserPage extends React.Component<{
  getUsers: Function;
  users: List<User>;
}> {
  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    const { users } = this.props;
    return (
      <ContainerFull>
        <RowCentered>
          <Column xl={6}>
            <h2>
              Users
              <Link to="/users/add">
                <Button primary>Agregar</Button>
              </Link>
            </h2>
            <Wrapper>
              <ReactTable
                columns={columns}
                pageSize={5}
                pageSizeOptions={[5]}
                data={users.toArray()}
              />
            </Wrapper>
          </Column>
          <Column xl={6}>
            <Route path="/users/add" component={AddUser} />
            <Route path="/users/edit/:id" component={EditUser} />
          </Column>
        </RowCentered>
      </ContainerFull>
    );
  }
}

export default ListUserPage;
