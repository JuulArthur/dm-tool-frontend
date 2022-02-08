import { PayloadAction } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { CharacterInterface } from './Character';
import { LocationInterface } from '../location/LocationView';
import { RootState } from '../store';

export const GOT_CHARACTERS = 'GOT_CHARACTERS';
export const FETCH_CHARACTERS = 'FETCH_CHARACTERS';

const characterReducer = (
    state: { isFetching: boolean; characters: [CharacterInterface?] } = { isFetching: false, characters: [] },
    action: PayloadAction<any>
) => {
    switch (action.type) {
        case FETCH_CHARACTERS:
            return {
                ...state,
                isFetching: true,
            };
        case GOT_CHARACTERS:
            return {
                ...state,
                isFetching: false,
                characters: action.payload,
            };
        default:
            return state || [];
    }
};

const getAllCharacters = (state: RootState, chapterId: string) => state.character.characters;

export const getCharactersForChapter = createSelector(
    [getAllCharacters, (state, chapterId) => chapterId],
    (characters, chapterId) => characters.filter((character: LocationInterface) => character.chapterId === chapterId)
);

export default characterReducer;
