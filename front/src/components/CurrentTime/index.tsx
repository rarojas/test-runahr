import React from 'react';
import { interval, Subscription } from 'rxjs';
import styled from 'styled-components';
import moment from 'moment';

interface State {
  curTime: number;
}

interface Props {}
const Wrapper = styled.div`
  padding: 0.3em;
`;

export class CurrentTime extends React.Component<Props, State> {
  state: State = {
    curTime: Date.now()
  };

  intervalTime = interval(1000);
  subcription?: Subscription;

  setTime = () => {
    this.setState({
      curTime: Date.now()
    });
  };

  componentDidMount() {
    this.subcription = this.intervalTime.subscribe(this.setTime);
  }

  componentWillUnmount() {
    this.subcription!.unsubscribe();
  }

  render() {
    const { curTime } = this.state;

    return (
      <Wrapper>
        <label>{moment(curTime).format('MM/DD/YYYY h:mm:ss a')}</label>
      </Wrapper>
    );
  }
}
