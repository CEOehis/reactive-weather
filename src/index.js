import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import AppRouting from './containers/AppRouting';

ReactDOM.render(<AppRouting />, document.getElementById('root'));
registerServiceWorker();
if (module.hot) module.hot.accept();
