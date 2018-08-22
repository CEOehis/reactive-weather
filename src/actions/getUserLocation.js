import {
  GET_USER_LOCATION,
  GET_USER_LOCATION_SUCCESS,
  GET_USER_LOCATION_ERROR
} from "./actionTypes";

const getUserLocation = () => {
  return {
    type: GET_USER_LOCATION
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
