import React from 'react';
import rules from './acl-rules';
import { Redirect } from 'react-router';
import { State } from '../root';
import { connect } from 'react-redux';
import { compose } from 'redux';

const check = (rules: any, role: string, action: any, data: any) => {
  const permissions = rules[role];
  if (!permissions) {
    // role is not present in the rules
    return false;
  }

  const staticPermissions = permissions.static;

  if (staticPermissions && staticPermissions.includes(action)) {
    return true;
  }

  const dynamicPermissions = permissions.dynamic;

  if (dynamicPermissions) {
    const permissionCondition = dynamicPermissions[action];
    if (!permissionCondition) {
      return false;
    }

    return permissionCondition(data);
  }
  return false;
};

const Can = (Component: any, perform: string) => (props: any) =>
  check(rules, props.role, perform, props) ? (
    <Component {...props} />
  ) : (
    <Redirect to="/forbiden" />
  );

Can.defaultProps = {
  role: ''
};

const mapStateToProps = (state: State) => ({
  role: state.authentication.getIn(['user', 'role'])
});

export default compose(
  connect(mapStateToProps),
  Can
);
