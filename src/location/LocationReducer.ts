import { PayloadAction } from '@reduxjs/toolkit';
import { LocationInterface } from './LocationView';
import { createSelector } from 'reselect';

export const FETCH_LOCATIONS = 'FETCH_LOCATIONS';
export const GOT_LOCATIONS = 'GOT_LOCATIONS';
export const GOT_LOCATION = 'GOT_LOCATION';
export const CREATED_LOCATION = 'CREATED_LOCATION';
export const GOT_LOCATION_TO_CHAPTER_REFERENCES = 'GOT_LOCATION_TO_CHAPTER_REFERENCES';

const locationReducer = (
    state: {
        isFetching: boolean;
        locations: [LocationInterface?];
        currentLocation: LocationInterface | null;
        locationToChapterReferences: [any?];
    } = {
        isFetching: false,
        locations: [],
        locationToChapterReferences: [],
        currentLocation: null,
    },
    action: PayloadAction<any>
) => {
    switch (action.type) {
        case FETCH_LOCATIONS:
            return {
                ...state,
                isFetching: true,
            };
        case GOT_LOCATIONS:
            return {
                ...state,
                isFetching: false,
                locations: action.payload,
            };
        case GOT_LOCATION:
            return {
                ...state,
                isFetching: false,
                currentLocation: action.payload,
            };
        case GOT_LOCATION_TO_CHAPTER_REFERENCES:
            return {
                ...state,
                isFetching: false,
                locationToChapterReferences: action.payload,
            };
        case CREATED_LOCATION:
            const locationToChapterReferencesCopy = [...state.locationToChapterReferences];
            if (action.payload.locationToChapterReference) {
                locationToChapterReferencesCopy.push(action.payload.locationToChapterReference);
            }
            return {
                ...state,
                isFetching: false,
                locations: [...state.locations, action.payload.location],
                locationToChapterReferences: locationToChapterReferencesCopy,
            };
        default:
            return state || [];
    }
};

const getAllLocations = (state: any, chapterId: string) => state.location.locations || [];
const getLocationReducer = (state: any, chapterId: string) => state.location || [];

export const getLocationsForChapter = createSelector(
    [getLocationReducer, (state, chapterId) => chapterId],
    (locationReducer, chapterId) => {
        const locations = locationReducer.locations;
        const locationToChapterReferences = locationReducer.locationToChapterReferences;
        const locationsForChapter = [];
        const locationToChapterReferencesForChapter = locationToChapterReferences.filter(
            (reference: any) => reference.chapterId === chapterId
        );
        for (let locationReference of locationToChapterReferencesForChapter) {
            const locationObject = locations.find((location: LocationInterface) => {
                return location.id === locationReference.locationId;
            });
            locationsForChapter.push({
                ...locationObject,
                order: locationReference.order,
                locationReferenceId: locationReference.id,
            });
        }
        return locationsForChapter.filter((character) => !!character);
    }
);

export default locationReducer;
