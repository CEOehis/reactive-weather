import React from 'react';
import Card from 'material-ui/Card';
import './DaysWeather.css';
import clear from '../images/clear.png';
import rain from '../images/rain.png';
import cloudy from '../images/cloudy.png';
import snow from '../images/snow.png';
import wind from '../images/wind.png';

function DaysWeather(props) {
  const { day, weather, high, low} = props
  var icon = weather === 'sunny' ? clear :
             weather === 'rainy' ? rain :
             weather === 'cloudy' ? cloudy :
             weather === 'snowy' ? snow : wind
  var iconImgUrl = `url(${icon})`;
  return (
    <Card className="weather-card">
      <p>{day.slice(0,3)}</p>
      <div className="icon" style={{backgroundImage: iconImgUrl, color: 'red'}}></div>
      <div className="temperature">{high}&deg;</div>
      <div className="temperature">{low}&deg;</div>
    </Card>
  )
}

export default DaysWeather;