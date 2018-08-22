import { SET_USER_LOCATION } from "./actionTypes";

const setUserLocation = ({lat, long}) => {
  return {
    type: SET_USER_LOCATION,
    lat,
    long
  }
}

export default setUserLocation;
