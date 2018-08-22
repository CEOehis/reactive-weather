import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from 'react-redux';

import Navbar from '../components/Navbar';
import WeatherDetails from '../components/WeatherDetails';
import App from './App';
import Footer from '../components/Footer';
import setUserLocation from '../actions/setUserLocation';
import { fetchWeather } from '../utils/api';
import getUserLocation, {
  getUserLocationSuccess,
  getUserLocationError
} from '../actions/getUserLocation';
import fetchWeatherData, {
  fetchWeatherDataSuccess
} from '../actions/fetchWeatherData';

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
      dispatch(getUserLocation())
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { longitude, latitude } = position.coords;
            dispatch(getUserLocationSuccess());
            dispatch(setUserLocation({lat: latitude, long: longitude}));
            nextAction(latitude, longitude).then((data) => {
              dispatch(fetchWeatherDataSuccess())
              dispatch(fetchWeatherData(data))
            });
          },
          (e) => {
            // error obtaining user location
            dispatch(getUserLocationError(e));
          },
        )
      }
    }
  }
}


export default connect(null, mapDispatchToProps)(AppRouting);
