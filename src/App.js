import React, { Component } from 'react';
import './App.css';
import DaysWeather from './components/DaysWeather';
import Card from 'material-ui/Card';
import wind from './images/wind.png';

const weeksWeather = [
  {day: 'Wednesday', weather: 'sunny', high: 78, low: 67},
  {day: 'Thursday', weather: 'cloudy', high: 83, low: 66},
  {day: 'Friday', weather: 'sunny', high: 75, low: 65},
  {day: 'Saturday', weather: 'rainy', high: 78, low: 64},
  {day: 'Sunday', weather: 'snowy', high: 77, low: 62},
  {day: 'Monday', weather: 'rainy', high: 71, low: 61},
  {day: 'Tuesday', weather: 'cloudy', high: 70, low: 60},
]

class App extends Component {
  constructor() {
    super();
    this.getUserLocation = this.getUserLocation.bind(this);

    this.state = {
      lat: '',
      long: '',
      timezone: '',
      currently: '',
      hourly: '',
      daily: ''
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
    const BASE_URL = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/e0477ed58041c8232d9f57dc2652536d/'; debugger;
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
        daily: res.daily
      })
    }).catch(e => console.error(e))
  }
  render() {
    const { timezone, currently } = this.state;

    return (
      <div>
        <Card className="app">
          <h1>{timezone}</h1>
          <h3>{currently ? new Date(currently.time * 1000).toString() : '--:--'}</h3>
          <h3>{currently.summary}</h3>
          <div style={{backgroundImage: `url(${wind})`, width: '128px', height: '128px', backgroundRepeat: 'no-repeat', backgroundSize: 'contain', display: 'inline-block'}}></div>
          <h1 style={{display: 'inline-block', verticalAlign: 'top'}}>{currently.temperature}&deg;F</h1>
          <div className="week-weather">
            {weeksWeather.map((weather,  i) =>
              <DaysWeather key={i} {...weather} />
            )}
          </div>
        </Card>
      </div>
    );
  }
}

export default App;
