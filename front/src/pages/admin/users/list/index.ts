import { State } from './../../../../store/root';
import Users from './page';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../../../../store/ducks/users/types';

const mapStateToProps = (state: State) => {
  return {
    users: state.users.users.toList()
  };
};

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      getUsers: actions.getUsers
    },
    dispatch
  );

export default connect(mapStateToProps,mapDispatchToProps)(Users);
