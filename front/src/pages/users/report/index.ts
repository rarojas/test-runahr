import {
  getReport,
  ClockingRecord
} from './../../../store/ducks/clockings/types';
import { State } from './../../../store/root';
import Page from './page';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { List } from 'immutable';

const mapStateToProps = (state: State) => {
  return {
    clockings: state.clockings.clockings
      .get(state.authentication.user!.id, List<ClockingRecord>())
      .toArray()
  };
};

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      getReport
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
  //@ts-ignore
)(Page);
