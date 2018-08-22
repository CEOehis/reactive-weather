import {
  GET_USER_LOCATION,
  GET_USER_LOCATION_SUCCESS
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

export default getUserLocation;
