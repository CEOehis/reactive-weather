import {
  GET_USER_LOCATION,
  GET_USER_LOCATION_ERROR,
  GET_USER_LOCATION_SUCCESS
} from "./actionTypes";

import { fetchUserWeather } from "./fetchWeatherData";
import { getCurrentPosition } from "../utils/api";
import setUserLocation from "./setUserLocation";

const getUserLocation = () => {
  return (dispatch) => {
    // do network request for getting user location here
    dispatch({ type: GET_USER_LOCATION }); // signal start of location finding
    getCurrentPosition()
      .then((position) => {
        dispatch(getUserLocationSuccess());
        const { longitude, latitude } = position.coords;
        dispatch(setUserLocation({lat: latitude, long: longitude}));
        dispatch(fetchUserWeather(latitude, longitude));
      })
      .catch((error) => {
        // error obtaining user location
        dispatch(getUserLocationError(error));
      });
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
