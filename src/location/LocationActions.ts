import { FETCH_LOCATIONS, GOT_LOCATIONS, GOT_LOCATION } from '../reducers/LocationReducer';
import { fetchJSON } from '../utils';

export const getLocations = () => {
    return (dispatch: any) => {
        dispatch({ type: FETCH_LOCATIONS });
        return fetchJSON({ url: '/location/all' })
            .then((result) => {
                dispatch({ type: GOT_LOCATIONS, payload: result.body });
            })
            .catch((e) => console.log(e + ''));
    };
};

export const getLocation = ({ id }: { id: string | undefined }) => {
    return (dispatch: any) => {
        dispatch({ type: FETCH_LOCATIONS });
        return fetchJSON({ url: `/location/${id}` })
            .then((result) => {
                console.log('result', result);
                dispatch({ type: GOT_LOCATION, payload: result.body });
            })
            .catch((e) => console.log(e + ''));
    };
};
