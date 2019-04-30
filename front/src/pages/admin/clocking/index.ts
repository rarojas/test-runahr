import { connect } from 'react-redux';
import { State } from './../../../store/root';
import { checkUser } from './../../../store/ducks/clockings/types';
import Page from './page';
import { bindActionCreators } from 'redux';

const mapStateToProps = (state: State) => {
  return {};
};

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      checkUser
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Page);
