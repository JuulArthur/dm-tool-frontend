import { FETCH_LOCATIONS, GOT_LOCATIONS } from '../reducers/LocationReducer';
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
