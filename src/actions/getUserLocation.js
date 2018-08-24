import {
  GET_USER_LOCATION,
  GET_USER_LOCATION_ERROR,
  GET_USER_LOCATION_SUCCESS
} from "./actionTypes";
import fetchWeatherData, { fetchWeatherDataSuccess } from "./fetchWeatherData";

import setUserLocation from "./setUserLocation";

const getUserLocation = (nextAction) => {
  return (dispatch) => {
    // do network request for getting user location here
      dispatch({ type: GET_USER_LOCATION }); // signal start of location finding
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { longitude, latitude } = position.coords;
            dispatch(getUserLocationSuccess());
            dispatch(setUserLocation({lat: latitude, long: longitude}));
            nextAction(latitude, longitude).then((data) => {
              dispatch(fetchWeatherDataSuccess())
              dispatch(fetchWeatherData(data))
            });
          },
          (e) => {
            // error obtaining user location
            dispatch(getUserLocationError(e));
          },
        )
      }
  }
}

export const getUserLocationSuccess = () => {
  return {
    type: GET_USER_LOCATION_SUCCESS
  }
}

export const getUserLocationError = (error) => {
  return {
    type: GET_USER_LOCATION_ERROR,
    error,
  }
}

export default getUserLocation;
