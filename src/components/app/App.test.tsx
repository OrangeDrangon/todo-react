import React from 'src/components/App/node_modules/react';
import ReactDOM from 'src/components/App/node_modules/react-dom';
import App from './App.component';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
