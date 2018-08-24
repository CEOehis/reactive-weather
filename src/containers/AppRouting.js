import React, { Component, Fragment } from 'react'
import { Route, BrowserRouter as Router } from "react-router-dom";
import fetchWeatherData, {
  fetchWeatherDataSuccess
} from '../actions/fetchWeatherData';

import App from './App';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import WeatherDetails from '../components/WeatherDetails';
import { connect } from 'react-redux';
import getUserLocation from '../actions/getUserLocation';

export class AppRouting extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getUserLocation();
  }

  render() {
    return (
      <Router>
        <Fragment>
          <Navbar />
          <Route
            exact path="/"
            render={(props) => <App {...props} />}
          />
          <Route
            path="/details/:time"
            render={(props) => <WeatherDetails {...props} />}
          />
          <Footer />
        </Fragment>
      </Router>
    )
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getUserLocation() {
      dispatch(getUserLocation())
    }
  }
}


export default connect(null, mapDispatchToProps)(AppRouting);
