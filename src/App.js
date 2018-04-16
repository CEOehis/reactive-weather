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
  constructor(props) {
    super(props);

    this.showHourly = this.showHourly.bind(this);
    this.logi = this.logi.bind(this);
  }

  showHourly (time) {
    this.props.history.push(`/details/${time}`);
  }

  render() {
    const { timezone, currently, daily } = this.props;

    return (
      <div>
        <Card className="app">
          <h1>{timezone}</h1>
          <h3>{currently ? new Date(currently.time * 1000).toString() : '--:--'}</h3>
          <h3>{currently.summary}</h3>
          <div style={{backgroundImage: `url(${wind})`, width: '128px', height: '128px', backgroundRepeat: 'no-repeat', backgroundSize: 'contain', display: 'inline-block'}}></div>
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
