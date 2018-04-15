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
      daily: []
    }
  }
  componentDidMount() {
    this.getUserLocation();
  }

  getUserLocation() {
    if (navigator.geolocation) {
      console.log('started')
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
          this.setState({
            long: position.coords.longitude,
            lat: position.coords.latitude
          });
          this.fetchWeatherData();
        },
        (e) => {
          console.log(e);
        },
        // {
        //   timeout: 20000,
        // }
      )
    }
  }

  fetchWeatherData() {
    console.log('i was called');
    console.log(this);
    const BASE_URL = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/e0477ed58041c8232d9f57dc2652536d/';
    console.log(this.state);
    console.log(this.state.long);
    const LAT = this.state.lat;
    const LONG = this.state.long;
    fetch(`${BASE_URL}${LAT},${LONG}?exclude=minutely,alerts,flags&extend=hourly`).then(res => {
      console.log(res);
      return res.json();
    }).then(res => {
      console.log(res);
      this.setState({
        timezone: res.timezone,
        currently: res.currently,
        hourly: res.hourly,
        daily: res.daily.data
      })
    }).catch(e => console.error(e))
  }
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Route exact path="/" render={(props) => <App {...props}  {...this.state} />} />
          <Route path="/details" component={WeatherDetails} />
        </div>
      </Router>
    )
  }
}

ReactDOM.render(<AppRouting />, document.getElementById('root'));
registerServiceWorker();
if (module.hot) module.hot.accept();