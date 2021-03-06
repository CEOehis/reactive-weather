import React, { Component } from 'react';
import './DaysWeather.css';
import clear from '../images/clear.png';
import rain from '../images/rain.png';
import cloudy from '../images/cloudy.png';
import snow from '../images/snow.png';
import wind from '../images/wind.png';
import sleet from '../images/sleet.png';
import partlyCloudy from '../images/partlyCloudy.png';
import fog from '../images/fog.png';

const days = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

class DaysWeather extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onWeatherClick(this.props.time);
  }

  render() {
    const { time, icon, temperatureMax, temperatureMin} = this.props;
    var iconImg;
    switch (icon) {
      case 'clear-day':
      case 'clear-night':
        iconImg = clear;
        break;
      case 'rain':
        iconImg = rain;
        break;
      case 'sleet':
        iconImg = sleet;
      case 'fog':
        iconImg = fog;
        break;
      case 'snow':
        iconImg = snow;
        break;
      case 'cloudy':
        iconImg = cloudy;
        break;
      case 'partly-cloudy-day':
      case 'partly-cloudy-night':
        iconImg = partlyCloudy;
        break;
      default:
        iconImg = wind;
    }

    var iconImgUrl = `url(${iconImg})`;
    return (
      <div className="weather-card" onClick={this.handleClick}>
        <p>{days[(new Date(time * 1000).getDay())].slice(0, 3)}</p>
        <div className="icon" style={{backgroundImage: iconImgUrl, color: 'red'}}></div>
        <div className="temperature">{temperatureMax.toFixed(0)}&deg;</div>
        <div className="temperature">{temperatureMin.toFixed(0)}&deg;</div>
      </div>
    )
  }
}

export default DaysWeather;