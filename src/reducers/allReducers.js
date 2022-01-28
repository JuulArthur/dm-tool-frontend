import { combineReducers } from 'redux';
import characterReducer from './characterReducer';
import locationReducer from './LocationReducer';

const allReducers = combineReducers({ character: characterReducer, locations: locationReducer });

export default allReducers;
