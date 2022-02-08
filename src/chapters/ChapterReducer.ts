import { PayloadAction } from '@reduxjs/toolkit';
import { ChapterInterface } from './Chapter';

export const FETCH_CHAPTERS = 'FETCH_CHAPTERS';
export const GOT_CHAPTERS = 'GOT_CHAPTERS';
export const GOT_CHAPTER = 'GOT_CHAPTER';

const chapterReducer = (
    state: { isFetching: boolean; chapters: [ChapterInterface?]; currentChapter: ChapterInterface | null } = {
        isFetching: false,
        chapters: [],
        currentChapter: null,
    },
    action: PayloadAction<any>
) => {
    switch (action.type) {
        case FETCH_CHAPTERS:
            return {
                ...state,
                isFetching: true,
            };
        case GOT_CHAPTERS:
            return {
                ...state,
                isFetching: false,
                chapters: action.payload,
            };

        case GOT_CHAPTER:
            return {
                ...state,
                isFetching: false,
                currentChapter: action.payload,
            };
        default:
            return state;
    }
};

export default chapterReducer;
