import { FETCH_WEATHER_DATA, FETCH_WEATHER_DATA_SUCCESS } from "./actionTypes";

import { fetchWeather } from "../utils/api";

export const fetchUserWeather = (lat, long) => {
  return (dispatch) => {
    fetchWeather(lat, long)
      .then((data) => {
        dispatch(fetchWeatherDataSuccess());
        dispatch(fetchWeatherData(data));
      })
  }
}

const fetchWeatherData = (data) => {
  return {
    type: FETCH_WEATHER_DATA,
    data,
  }
}

export const fetchWeatherDataSuccess = () => {
  return {
    type: FETCH_WEATHER_DATA_SUCCESS,
  }
}

export default fetchWeatherData;
