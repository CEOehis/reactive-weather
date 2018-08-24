import React, { Component, Fragment } from 'react'
import { Route, BrowserRouter as Router } from "react-router-dom";
import fetchWeatherData, {
  fetchWeatherDataSuccess
} from '../actions/fetchWeatherData';
import getUserLocation, {
  getUserLocationError,
  getUserLocationSuccess
} from '../actions/getUserLocation';

import App from './App';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import WeatherDetails from '../components/WeatherDetails';
import { connect } from 'react-redux';
import { fetchWeather } from '../utils/api';
import setUserLocation from '../actions/setUserLocation';

export class AppRouting extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getUserLocation(fetchWeather);
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
    getUserLocation(nextAction) {
      dispatch(getUserLocation(nextAction))
    }
  }
}


export default connect(null, mapDispatchToProps)(AppRouting);
