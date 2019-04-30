import { State } from './../../../store/root';
import Page from './page';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const mapStateToProps = (state: State) => ({
  isAuthenticated: state.authentication.isAuthenticated,
  isAdmin: state.authentication.isAdmin
});

const mapDispatchToProps = (dispatch: any) => bindActionCreators({}, dispatch);

export default connect()(Page);
