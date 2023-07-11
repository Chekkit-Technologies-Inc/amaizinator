import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import './index.css';
import 'react-notifications-component/dist/theme.css';
import 'react-phone-number-input/style.css';
import App from './app';
import 'rsuite/dist/rsuite.min.css';

import { Provider } from 'react-redux';
import store from './states/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
