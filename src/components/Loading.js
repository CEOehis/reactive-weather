import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';

const styles = theme => ({
  location: {
    margin: theme.spacing.unit * 2,
    color: 'red'
  },
  weather: {
    margin: theme.spacing.unit * 2,
    color: 'purple'
  },
  centered: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

function Loading(props) {
  const { classes, status } = props;
  return (
    <div className={classes.centered}>
      <CircularProgress
        className={status === 'weather' ? classes.weather : classes.location}
        size={100}
      />
      <h1>...fetching {status}</h1>
    </div>
  );
}

Loading.propTypes = {
  classes: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
};

export default withStyles(styles)(Loading);
