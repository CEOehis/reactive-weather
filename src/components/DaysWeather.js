import React from 'react';
import Card from 'material-ui/Card';
import './DaysWeather.css';

function DaysWeather(props) {
  const { day, weather, high, low} = props
  var icon = weather === 'sunny' ? 'clear.png' :
             weather === 'rainy' ? 'rain.png' :
             weather === 'cloudy' ? 'cloudy.png' :
             weather === 'snowy' ? 'snow.png' : 'wind.png'
  var iconImgUrl = `url("../images/${icon}")`;
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