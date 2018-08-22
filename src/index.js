import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import AppRouting from './containers/AppRouting';
import store from './store';
import { Provider } from 'react-redux';

const domRootNode = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <AppRouting />
  </Provider>,
  domRootNode
);

registerServiceWorker();
if (module.hot) module.hot.accept();
