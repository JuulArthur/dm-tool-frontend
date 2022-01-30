import { PayloadAction } from '@reduxjs/toolkit';
import { LocationInterface } from '../location/LocationView';

export const FETCH_LOCATIONS = 'FETCH_LOCATIONS';
export const GOT_LOCATIONS = 'GOT_LOCATIONS';
export const GOT_LOCATION = 'GOT_LOCATION';

const locationReducer = (
    state: { isFetching: boolean; locations: [LocationInterface?]; currentLocation: LocationInterface | null } = {
        isFetching: false,
        locations: [],
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
        default:
            return state || [];
    }
};

export default locationReducer;
