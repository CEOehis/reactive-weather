import {
  GET_USER_LOCATION,
  GET_USER_LOCATION_SUCCESS,
  SET_USER_LOCATION,
  FETCH_WEATHER_DATA_SUCCESS
} from "../actions/actionTypes";

const initialState = {
  lat: '',
  long: '',
  isGettingUserLocation: false,
  isFetchingWeather: false,
}

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_LOCATION:
      return {
        ...state,
        isGettingUserLocation: true,
      }
    case GET_USER_LOCATION_SUCCESS:
      return {
        ...state,
        isGettingUserLocation: false,
        isFetchingWeather: true,
      }
    case SET_USER_LOCATION:
      return {
        ...state,
        lat: action.lat,
        long: action.long,
      }
    case FETCH_WEATHER_DATA_SUCCESS:
      return {
        ...state,
        isFetchingWeather: false,
      }
    default:
      return state;
  }
}

export default locationReducer;
