import React from 'react';
import {
  Container,
  Button,
  Navbar,
  NavbarLink,
  Nav
  //@ts-ignore
} from 'styled-bootstrap-components';
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
              <NavbarLink light brand href={isAuthenticated ? '/home' : '/'}>
                Clocking
              </NavbarLink>

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
              <Nav start="true" collapse expandSm hidden={hidden}>
                {isAdmin ? (
                  <>
                    <NavbarLink light href="/users">
                      Users
                    </NavbarLink>
                    <NavbarLink light href="/clockings">
                      Check In
                    </NavbarLink>
                    <NavbarLink light href="/report">
                      My Report
                    </NavbarLink>
                  </>
                ) : (
                  <NavbarLink light href="/report">
                    My Report
                  </NavbarLink>
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
