import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from 'react-redux';
import Navbar from '../components/Navbar';
import WeatherDetails from '../components/WeatherDetails';
import App from './App';
import Footer from '../components/Footer';
import getUserLocation, { getUserLocationSuccess, getUserLocationError } from '../actions/getUserLocation';
import setUserLocation from '../actions/setUserLocation';
import fetchWeatherData, {
  fetchWeatherDataSuccess
} from '../actions/fetchWeatherData';

export class AppRouting extends Component {
  constructor(props) {
    super(props);
    this.getUserLocation = this.getUserLocation.bind(this);
    this.fetchWeatherData = this.fetchWeatherData.bind(this);
  }

  componentDidMount() {
    this.props.getUserLocation(this.fetchWeatherData);
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.fetchWeatherData();
        },
        (e) => {
          this.setState({
            error: e
          })
        },
      )
    }
  }

  fetchWeatherData() {
    const BASE_URL = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/e0477ed58041c8232d9f57dc2652536d/';
    const LAT = this.props.lat;
    const LONG = this.props.long;
    return fetch(`${BASE_URL}${LAT},${LONG}?exclude=minutely,alerts,flags&extend=hourly`).then(res => {
      return res.json();
    }).then(res => {
      return res;
    }).catch(e => this.setState({
      error: e
    }))
  }


  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Route exact path="/" render={(props) => <App {...props} {...this.state} />} />
          <Route path="/details/:time" render={(props) => <WeatherDetails {...props} {...this.state} />} />
          <Footer />
        </div>
      </Router>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    lat: state.location.lat,
    long: state.location.long,
    error: state.location.error
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
            // this.fetchWeatherData();
            nextAction().then((data) => {
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


export default connect(mapStateToProps, mapDispatchToProps)(AppRouting);
