import React, { Component, FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { State } from '../store/root';
import { Redirect } from 'react-router';

const NoAuthenticated = (Component: any, route = '/home') => (
  props: any
): React.ComponentElement<any, any> => {
  const { isLogged } = props;
  return (
    <React.Fragment>
      {!isLogged ? <Component {...props} /> : <Redirect to={route} />}
    </React.Fragment>
  );
};

const mapStateToProps = (state: State) => {
  const isLogged = state.authentication.isAuthenticated;
  return {
    isLogged
  };
};

export default compose<FunctionComponent<any>>(
  connect(
    mapStateToProps,
    null
  ),
  NoAuthenticated
);
