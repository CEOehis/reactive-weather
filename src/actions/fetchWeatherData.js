import { FETCH_WEATHER_DATA, FETCH_WEATHER_DATA_SUCCESS } from "./actionTypes";

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
