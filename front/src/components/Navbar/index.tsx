import React from 'react';
import {
  Container,
  Button,
  Navbar,
  NavbarLink,
  Nav
  //@ts-ignore
} from 'styled-bootstrap-components';
import { Link } from 'react-router-dom';
import { CurrentTime } from '../CurrentTime';

interface Props {
  isAuthenticated: boolean;
  isAdmin: boolean;
  logout: Function;
}

export default class NavbarLight extends React.Component<Props> {
  state = {
    hidden: true
  };

  handleOpenCloseNav() {
    this.setState({
      hidden: !this.state.hidden
    });
  }

  render() {
    const { isAuthenticated, isAdmin, logout } = this.props;

    const { hidden } = this.state;
    return (
      <Container fluid>
        <Container fluid>
          <Navbar expandSm light>
            <Nav start="true">
              <Link to={isAuthenticated ? '/home' : '/'}>
                <NavbarLink light brand>
                  Clocking
                </NavbarLink>
              </Link>
              <Button
                light
                outline
                toggleCollapse
                expandSm
                onClick={() => this.handleOpenCloseNav()}
              >
                <span>&#9776;</span>
              </Button>
            </Nav>
            {isAuthenticated && (
              <Nav start collapse expandSm hidden={hidden}>
                {isAdmin ? (
                  <>
                    <Link to="/users">
                      <NavbarLink light>Users</NavbarLink>
                    </Link>
                    <Link to="/clockings">
                      <NavbarLink light>Check In</NavbarLink>
                    </Link>
                    <Link to="/report">
                      <NavbarLink light>My Report</NavbarLink>
                    </Link>
                  </>
                ) : (
                  <Link to="/report">
                    <NavbarLink light>My Report</NavbarLink>
                  </Link>
                )}
              </Nav>
            )}
            <Nav end="true" collapse expandSm hidden={hidden}>
              <CurrentTime />
              {isAuthenticated && <Button onClick={logout}>Logout</Button>}
            </Nav>
          </Navbar>
        </Container>
      </Container>
    );
  }
}
