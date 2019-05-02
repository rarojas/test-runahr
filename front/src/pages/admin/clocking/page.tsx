import React from 'react';
import {
  Column,
  FormGroup,
  Button,
  ListGroup,
  ListGroupItem
  //@ts-ignore
} from 'styled-bootstrap-components';
import {
  ContainerFull,
  RowCentered
} from '../../../components/layout/Forms/Layouts';
import { User } from '../../../store/ducks/users/types';
import SearchUser from '../../../components/SearchUser';
import { CurrentTime } from '../../../components/CurrentTime';
import styled from 'styled-components';
import Swal from 'sweetalert2';

const UserListItem = styled(ListGroupItem)`
  cursor: pointer !important;
`;

interface State {
  users: User[];
  selected?: User;
  loading: boolean;
}

interface Props {
  checkUser: Function;
}

export default class Clocking extends React.Component<Props, State> {
  state: State = {
    users: [],
    selected: undefined,
    loading: false
  };

  setUsers = (users: User[]) => {
    this.setState({
      users,
      selected: undefined
    });
  };

  setUser = (selected: User) => () => {
    this.setState({
      selected
    });
  };

  checkUser = () => {
    const { selected } = this.state;
    if (selected)
      this.props.checkUser({
        userId: selected!.id
      });
  };

  render() {
    const { selected, users } = this.state;
    return (
      <ContainerFull>
        <RowCentered>
          <Column>
            <FormGroup>
              <h2>User</h2>
            </FormGroup>
            <SearchUser onResult={this.setUsers} />
            <label>Results:</label>
            <ListGroup>
              {users.map(user => (
                <UserListItem
                  key={user.id}
                  onClick={this.setUser(user)}
                  active={selected && user.id === selected!.id}
                >
                  {user.username}
                </UserListItem>
              ))}
            </ListGroup>

            {selected && (
              <>
                <label>Selected User</label>
                <div>{selected!.username}</div>
                <div>{selected!.role}</div>
                <CurrentTime />
                <Button primary onClick={this.checkUser}>
                  Check In
                </Button>
              </>
            )}
          </Column>
        </RowCentered>
      </ContainerFull>
    );
  }
}
