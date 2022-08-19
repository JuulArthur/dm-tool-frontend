import {
    FETCH_LOCATIONS,
    GOT_LOCATIONS,
    GOT_LOCATION,
    GOT_LOCATION_TO_CHAPTER_REFERENCES,
    CREATED_LOCATION,
} from './LocationReducer';
import { fetchJSON } from '../utils';

export const getLocations = () => {
    return (dispatch: any) => {
        dispatch({ type: FETCH_LOCATIONS });
        return fetchJSON({ url: '/location/all' })
            .then((result: any) => {
                dispatch({ type: GOT_LOCATIONS, payload: result.body });
            })
            .catch((e: any) => console.log(e + ''));
    };
};

export const getLocation = ({ id }: { id: string | undefined }) => {
    return (dispatch: any) => {
        dispatch({ type: FETCH_LOCATIONS });
        return fetchJSON({ url: `/location/${id}` })
            .then((result: any) => {
                //dispatch({ type: GOT_LOCATION, payload: result.body });
            })
            .catch((e: any) => console.log(e + ''));
    };
};

export const getLocationToChapterReferences = () => {
    return (dispatch: any) => {
        dispatch({ type: FETCH_LOCATIONS });
        return fetchJSON({ url: `/location/location-to-chapter-reference/all` })
            .then((result: any) => {
                dispatch({ type: GOT_LOCATION_TO_CHAPTER_REFERENCES, payload: result.body });
            })
            .catch((e: any) => console.log(e + ''));
    };
};

export const createLocation = ({ chapterId }: { chapterId?: string }) => {
    return (dispatch: any) => {
        return fetchJSON({ url: '/location', method: 'POST', body: { chapterId, name: 'A fresh new location' } })
            .then((result: any) => {
                dispatch({ type: CREATED_LOCATION, payload: result.body });
            })
            .catch((e: any) => console.log('Something went wrong when creating location: ' + e));
    };
};
