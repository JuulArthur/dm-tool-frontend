import { combineReducers } from 'redux';
import characterReducer from './characterReducer';

const allReducers = combineReducers({ character: characterReducer });

export default allReducers;
