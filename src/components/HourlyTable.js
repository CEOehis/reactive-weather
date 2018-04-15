import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

import clear from '../images/clear.png';
import rain from '../images/rain.png';
import cloudy from '../images/cloudy.png';
import snow from '../images/snow.png';
import wind from '../images/wind.png';
import sleet from '../images/sleet.png';
import partlyCloudy from '../images/partlyCloudy.png';
import fog from '../images/fog.png';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

function getWeatherIcon(icon) {
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

  return iconImg
}

function SimpleTable(props) {
  const { classes, data } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell style={{paddingLeft: '0'}}>Weather</TableCell>
            <TableCell>Temperature</TableCell>
            <TableCell>Summary</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.map((weather , i) => {
            var icon = getWeatherIcon(weather.icon);
            return (
              <TableRow key={i}>
                <TableCell>{(`0${(new Date(weather.time * 1000)).getHours()}:00`).slice(-5)}</TableCell>
                <TableCell numeric style={{backgroundImage: `url(${icon})`, backgroundRepeat: 'no-repeat', backgroundSize: 'contain'}}></TableCell>
                <TableCell>{weather.temperature.toFixed(0)}&deg;F</TableCell>
                <TableCell>{weather.summary}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);