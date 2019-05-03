import React from 'react';
import ReactDOM from 'react-dom';
import { CurrentTime } from '../index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CurrentTime />, div);
});
