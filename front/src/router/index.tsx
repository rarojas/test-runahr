import React, { lazy } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import NoAuthenticated from './NoAuthenticated';
import Authenticated from './Authenticated';
import NavBarApp from '../pages/navbar';
import Can from '../store/acl/Can';

const Login = NoAuthenticated(lazy(() => import('../pages/login')));
const Users = Authenticated(
  Can(lazy(() => import('../pages/admin/users/list')), 'user:list')
);
const Clocking = Authenticated(
  Can(lazy(() => import('../pages/admin/clocking')), 'clocking:create')
);
const Report = Authenticated(
  Can(lazy(() => import('../pages/users/report')), 'report:list')
);
const Forbiden = lazy(() => import('../pages/forbiden'));
const Home = Authenticated(lazy(() => import('../pages/home')));

const ReactRouter = () => {
  return (
    <BrowserRouter>
      <React.Fragment>
        <NavBarApp />
        <Route exact path="/" component={Login} />
        <Route exact path="/home" component={Home} />
        <Route path="/users" component={Users} />
        <Route path="/report" component={Report} />
        <Route path="/clockings" component={Clocking} />
        <Route path="/forbiden" component={Forbiden} />
      </React.Fragment>
    </BrowserRouter>
  );
};
export default ReactRouter;
