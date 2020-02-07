import React from 'react';
import ReactDOM from 'react-dom';
import MessagesToCascade from './MessagesToCascade';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MessagesToCascade />, div);
  ReactDOM.unmountComponentAtNode(div);
});
