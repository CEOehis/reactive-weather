import React, { Component } from 'react';
import Card from 'material-ui/Card';
import ErrorMessage from './ErrorMessage';
import Loading from './Loading';
import './WeatherDetails.css';
import SimpleTable from './HourlyTable';
import clear from '../images/clear.png';
import rain from '../images/rain.png';
import cloudy from '../images/cloudy.png';
import snow from '../images/snow.png';
import wind from '../images/wind.png';
import sleet from '../images/sleet.png';
import partlyCloudy from '../images/partlyCloudy.png';
import fog from '../images/fog.png';

class WeatherDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      today: '',
      hourly: []
    }
  }

  componentDidMount() {
    this.setState({
      isFetchingWeather: true
    })
    this.fetchHourlyData();
  }

  fetchHourlyData() {
    const BASE_URL = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/e0477ed58041c8232d9f57dc2652536d/';
    const LAT = this.props.lat;
    const LONG = this.props.long;
    const DAY = this.props.match.params.time;
    fetch(`${BASE_URL}${LAT},${LONG},${DAY}?exclude=currently,flags`).then(res => {
      return res.json();
    }).then(res => {
      this.setState({
        hourly: res.hourly.data,
        today: res.daily.data[0],
        isFetchingWeather: false
      })
    }).catch(e => this.setState({
        error: e
      }))
  }

  render() {
    const { hourly, today, error, isFetchingWeather } = this.state;
    const icon = today.icon;
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

    if(error && error.message) {
      return <ErrorMessage error={error} />
    }

    if(isFetchingWeather) {
      return <Loading status={'weather'} />
    }

    return (
      <Card className="details">
        <h1>{today ? new Date(today.time * 1000).toString() : '--:--'}</h1>
        <div>
          <div style={{backgroundImage: iconImgUrl, width: '128px', height: '128px', backgroundRepeat: 'no-repeat', backgroundSize: 'contain', display: 'inline-block'}}></div>
          <h3 style={{display: 'inline-block', verticalAlign: 'top'}}>{today.summary}</h3>
        </div>
        <h2>Hourly Forecast</h2>
        <SimpleTable data={hourly} />
      </Card>
    );
  }

}

export default WeatherDetails;