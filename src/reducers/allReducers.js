import { combineReducers } from 'redux';
import character from './characterReducer';
import location from './LocationReducer';
import chapter from './ChapterReducer';

const allReducers = combineReducers({
    character,
    location,
    chapter,
});

export default allReducers;
