import {
  getReport,
  ClockingRecord
} from './../../../store/ducks/clockings/types';
import { State } from './../../../store/root';
import Page from './page';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Map, List } from 'immutable';

const mapStateToProps = (state: State) => {
  console.log(state.clockings);
  
  return {
    clockings: state.clockings.clockings.get(
      state.authentication.user!.id,
      List<ClockingRecord>()
    )
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
