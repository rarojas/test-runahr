import React from 'react';
import { interval, Subscription } from 'rxjs';
import styled from 'styled-components';

interface State {
  curTime: string;
}

interface Props {}
const Wrapper = styled.div`
  padding: 0.3em;
`;

export class CurrentTime extends React.Component<Props, State> {
  state: State = {
    curTime: ''
  };

  intervalTime = interval(1000);
  subcription?: Subscription;

  setTime = () => {
    this.setState({
      curTime: new Date().toLocaleString()
    });
  };

  componentDidMount() {
    this.subcription = this.intervalTime.subscribe(this.setTime);
  }

  componentWillUnmount() {
    this.subcription!.unsubscribe();
  }

  render() {
    return (
      <Wrapper>
        <label>{this.state.curTime}</label>
      </Wrapper>
    );
  }
}
