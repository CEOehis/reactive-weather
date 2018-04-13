import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import DaysWeather from './components/DaysWeather';

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
  render() {
    return (
      <div>
        <Navbar />
        <div className="week-weather">
          {weeksWeather.map((weather,  i) =>
            <DaysWeather key={i} {...weather} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
