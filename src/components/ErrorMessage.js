import React from 'react';

const style = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 20
}

function ErrorMessage({error}) {
  let errorObj = {
    title: 'Oh shit'
  };
  if(error.code) {
    switch (error.code) {
      case 1:
        errorObj.message = 'Unable to get your location. Please enable \'allow location access\' ';
        break;
      case 2:
        errorObj.message = 'Unable to get your location from location services. Try reloading the page';
        break;
      case 3:
        errorObj.message = 'Unable to get your location. Try reloading the page';
        break;
      default:
        errorObj.message = 'Something went wrong'
        break;
    }
  } else {
    errorObj.message = 'Unable to obtain weather information. Try reloading this page'
  }
  return (
    <div style={style}>
      <h1>{errorObj.title}</h1>
      <h3>{errorObj.message}</h3>
    </div>
  )
}

export default ErrorMessage;