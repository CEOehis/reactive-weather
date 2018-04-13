import React from 'react';
import './DaysWeather.css';

function DaysWeather(props) {
  const { day, weather, high, low} = props
  var icon = weather === 'sunny' ? 'clear.png' :
             weather === 'rainy' ? 'rain.png' :
             weather === 'cloudy' ? 'cloudy.png' :
             weather === 'snowy' ? 'snow.png' : 'wind.png'
  var iconImgUrl = `url("../images/${icon}")`;
  return (
    <div className="weather-card">
      <p>{day.slice(0,3)}</p>
      <div className="icon" style={{backgroundImage: iconImgUrl, color: 'red'}}></div>
      <div>{high}</div>
      <div>{low}</div>
    </div>
  )
}

export default DaysWeather;