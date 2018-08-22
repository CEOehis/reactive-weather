import { FETCH_WEATHER_DATA } from '../actions/actionTypes';

const initialState = {
  timezone: '',
  currently: '',
  hourly: '',
  daily: [],
  error: {},
}

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WEATHER_DATA:
      const { timezone, currently, hourly, daily } = action.data
      return {
        ...state,
        timezone,
        currently,
        hourly,
        daily: daily.data,
      }
    default:
      return state;
  }
}

export default weatherReducer;
