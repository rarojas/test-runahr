import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions } from '../../store/ducks/authentication';
import NavbarLight from '../../components/Navbar';
import { State } from '../../store/root';

const mapStateToProps = (state: State) => ({
  isAuthenticated: state.authentication.isAuthenticated,
  isAdmin: state.authentication.isAdmin
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      logout: actions.logout
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavbarLight);
