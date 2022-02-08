import { combineReducers } from 'redux';
import character from '../character/CharacterReducer';
import location from '../location/LocationReducer';
import chapter from '../chapters/ChapterReducer';

const allReducers = combineReducers({
    character,
    location,
    chapter,
});

export default allReducers;
