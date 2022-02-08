import { FETCH_CHARACTERS, GOT_CHARACTERS } from './CharacterReducer';
import { fetchJSON } from '../utils';

export const getCharacters = () => {
    return (dispatch: any) => {
        dispatch({ type: FETCH_CHARACTERS });
        return fetchJSON({ url: '/character/all' })
            .then((result) => {
                dispatch({ type: GOT_CHARACTERS, payload: result.body });
            })
            .catch((e) => console.log(e + ''));
    };
};
