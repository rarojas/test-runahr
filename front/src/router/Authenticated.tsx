import React, { Component, FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { State } from '../store/root';
import { Redirect } from 'react-router';

const Authenticated = (Component: any, route = '/') => (
  props: any
): React.ComponentElement<any, any> => {
  const { isLogged } = props;
  return (
    <React.Fragment>
      {isLogged ? <Component {...props} /> : <Redirect to={route} />}
    </React.Fragment>
  );
};

const mapStateToProps = (state: State) => ({
  isLogged: state.authentication.isAuthenticated,
  user: state.authentication.user
});
export default compose<FunctionComponent<any>>(
  connect(
    mapStateToProps,
    null
  ),
  Authenticated
);
