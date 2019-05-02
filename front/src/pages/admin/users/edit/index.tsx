import page from './page';
import { connect } from 'react-redux';
import { State } from '../../../../store/root';
import actions from '../../../../store/ducks/users/types';
import { bindActionCreators } from 'redux';

const mapStateToProps = (state: State, ownProps: any) => {
  const {
    match: {
      params: { id }
    }
  } = ownProps;
  return {
    user: state.users.users.get(`${id}`)
  };
};

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      editUser: actions.editUser
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(page);
