import { PayloadAction } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { CharacterInterface } from './Character';
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
    [getAllCharacters, (state, characterToChapterReferences) => characterToChapterReferences],
    (characters, characterToChapterReferences) => {
        const charactersForChapter = [];
        for (let characterReference of characterToChapterReferences) {
            const characterObject = characters.find(
                (character: CharacterInterface) => character.id === characterReference.characterId
            );
            charactersForChapter.push({
                ...characterObject,
                order: characterReference.order,
                characterReferenceId: characterReference.id,
            });
        }
        return charactersForChapter.filter((character) => !!character);
    }
);

export default characterReducer;
