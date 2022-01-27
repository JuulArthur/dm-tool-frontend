import { PayloadAction } from '@reduxjs/toolkit';
import { CharacterInterface } from '../character/Character';

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

export default characterReducer;
