import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from './components/Navbar';



const AppRouting = () => (
  <Router>
    <div>
      <Navbar />
      <Route exact path="/" component={App} />
      {/* <Route path="/today/:id" component={TodaysWeather} /> */}
    </div>
  </Router>
);

ReactDOM.render(<AppRouting />, document.getElementById('root'));
registerServiceWorker();
if (module.hot) module.hot.accept();