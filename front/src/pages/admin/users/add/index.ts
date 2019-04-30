import AddUser from './page';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../../../../store/ducks/users/types';

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      addUser: actions.addUser
    },
    dispatch
  );
export default connect(
  null,
  mapDispatchToProps
)(AddUser);
