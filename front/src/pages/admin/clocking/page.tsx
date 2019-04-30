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

interface State {
  users: User[];
  selected?: User;
}

interface Props {
  checkUser: Function;
}

export default class Clocking extends React.Component<Props, State> {
  state: State = {
    users: [],
    selected: undefined
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
            {users.map(user => (
              <ListGroup>
                <ListGroupItem
                  onClick={this.setUser(user)}
                  active={selected && user.id === selected!.id}
                >
                  {user.username}
                </ListGroupItem>
              </ListGroup>
            ))}
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
