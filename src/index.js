import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import WeatherDetails from './components/WeatherDetails';



class AppRouting extends Component {
  constructor() {
    super();
    this.getUserLocation = this.getUserLocation.bind(this);

    this.state = {
      lat: '',
      long: '',
      timezone: '',
      currently: '',
      hourly: '',
      daily: [],
      error: {},
      isGettingUserLocation: false,
      isFetchingWeather: false
    }
  }
  componentDidMount() {
    this.setState({
      isGettingUserLocation: true
    })
    this.getUserLocation();
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            long: position.coords.longitude,
            lat: position.coords.latitude,
            isGettingUserLocation: false,
            isFetchingWeather: true
          });
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
    const LAT = this.state.lat;
    const LONG = this.state.long;
    fetch(`${BASE_URL}${LAT},${LONG}?exclude=minutely,alerts,flags&extend=hourly`).then(res => {
      return res.json();
    }).then(res => {
      this.setState({
        timezone: res.timezone,
        currently: res.currently,
        hourly: res.hourly,
        daily: res.daily.data,
        isFetchingWeather: false
      })
    }).catch(e => this.setState({
      error: e
    }))
  }
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Route exact path="/" render={(props) => <App {...props}  {...this.state} />} />
          <Route path="/details/:time" render={(props) => <WeatherDetails {...props} {...this.state} />} />
          <footer className="footer">
            <div>built by <a href="https://github.com/ceoehis" target="_blank" rel="noopener noreferrer"><strong>celestine</strong>.</a></div>
            <div>view source code on <a href="https://github.com/CEOehis/reactive-weather" target="_blank" rel="noopener noreferrer"><strong>Github</strong>.</a></div>
          </footer>
        </div>
      </Router>
    )
  }
}

ReactDOM.render(<AppRouting />, document.getElementById('root'));
registerServiceWorker();
if (module.hot) module.hot.accept();