import { combineReducers } from 'redux';
import locationReducer from './locationReducer';
import weatherReducer from './weatherReducer';

const rootReducer = combineReducers({
  location: locationReducer,
  weather: weatherReducer
});

export default rootReducer;
