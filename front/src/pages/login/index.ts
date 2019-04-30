import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Login from './login';
import { actions } from '../../store/ducks/authentication';
import { State } from '../../store/root';
import HasLoader from '../../components/HasLoader';

const mapStateToProps = (state: State) => ({
  isAuthenticated: state.authentication.isAuthenticated,
  isAdmin: state.authentication.isAdmin,
  loading: state.authentication.loading
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      login: actions.login
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HasLoader(Login));