import React, { Component } from 'react';
import './App.css';
import DaysWeather from '../components/DaysWeather';
import ErrorMessage from '../components/ErrorMessage';
import Loading from '../components/Loading';
import Card from 'material-ui/Card';
import clear from '../images/clear.png';
import rain from '../images/rain.png';
import cloudy from '../images/cloudy.png';
import snow from '../images/snow.png';
import wind from '../images/wind.png';
import sleet from '../images/sleet.png';
import partlyCloudy from '../images/partlyCloudy.png';
import fog from '../images/fog.png';

class App extends Component {
  constructor(props) {
    super(props);

    this.showHourly = this.showHourly.bind(this);
  }

  showHourly (time) {
    this.props.history.push(`/details/${time}`);
  }

  render() {
    const {
      timezone,
      currently,
      daily,
      error,
      isGettingUserLocation,
      isFetchingWeather
    } = this.props;
    const icon = currently.icon;
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

    if(error.message) {
      return <ErrorMessage error={error} />
    }

    if(isGettingUserLocation) {
      return <Loading status={'your location'} />
    }

    if(isFetchingWeather) {
      return <Loading status={'weather'} />
    }

    return (
      <div>
        <Card className="app">
          <h1>{timezone}</h1>
          <h3>{currently ? new Date(currently.time * 1000).toString() : '--:--'}</h3>
          <h3>{currently.summary}</h3>
          <div style={{backgroundImage: iconImgUrl, width: '128px', height: '128px', backgroundRepeat: 'no-repeat', backgroundSize: 'contain', display: 'inline-block'}}></div>
          <h1 style={{display: 'inline-block', verticalAlign: 'top'}}>{currently ?currently.temperature.toFixed(0): '--'}&deg;F</h1>
          <div className="week-weather">
            {daily.map((weather,  i) =>
              <DaysWeather onWeatherClick={this.showHourly} key={i} {...weather} />
            )}
          </div>
        </Card>
      </div>
    );
  }
}

export default App;
