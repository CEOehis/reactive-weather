import React, { Component } from 'react';
import Card from 'material-ui/Card';
import './WeatherDetails.css';
import wind from '../images/wind.png';
import SimpleTable from './HourlyTable';

var data = [{id: 1, name: 'cy', calories: 'heh', fat: 'fatty', carbs: 'carby'}];

class WeatherDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      today: '',
      hourly: []
    }
  }

  componentDidMount() {
    this.fetchHourlyData();
    // fetch('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/e0477ed58041c8232d9f57dc2652536d/6.5243793,3.3792057,1523746800?exclude=currently,flags').then(res => {
    //     console.log(res);
    //     return res.json();
    // }).then(res => {
    //   console.log(res);
    //   this.setState({
    //     hourly: res.hourly.data
    //   })
    // })
  }

  fetchHourlyData() {
    const BASE_URL = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/e0477ed58041c8232d9f57dc2652536d/';
    const LAT = this.props.lat;
    const LONG = this.props.long;
    const DAY = 1523746800;
    fetch(`${BASE_URL}${LAT},${LONG},${DAY}?exclude=currently,flags`).then(res => {
      console.log(res);
      return res.json();
    }).then(res => {
      console.log(res);
      this.setState({
        hourly: res.hourly.data
      })
    })
  }

  render() {
    const { hourly } = this.state;
    return (
      <Card className="details">
        <h1>15th, January, 2018</h1>
        <div style={{backgroundImage: `url(${wind})`, width: '128px', height: '128px', backgroundRepeat: 'no-repeat', backgroundSize: 'contain', display: 'inline-block'}}></div>
        <h1 style={{display: 'inline-block', verticalAlign: 'top'}}>93&deg;F</h1>
        {/* <h1 style={{display: 'inline-block', verticalAlign: 'top'}}>{currently ?currently.temperature.toFixed(0): '--'}&deg;F</h1> */}
        <h2>Hourly Forecast</h2>
        <SimpleTable data={hourly} />
      </Card>
    );
  }

}

export default WeatherDetails;