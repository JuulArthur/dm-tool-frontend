import { PayloadAction } from '@reduxjs/toolkit';
import { LocationInterface } from '../location/LocationView';

export const GOT_LOCATIONS = 'GOT_LOCATIONS';
export const FETCH_LOCATIONS = 'FETCH_LOCATIONS';

const locationReducer = (
    state: { isFetching: boolean; locations: [LocationInterface?] } = { isFetching: false, locations: [] },
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
        default:
            return state || [];
    }
};

export default locationReducer;
