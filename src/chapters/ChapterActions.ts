import { FETCH_CHAPTERS, GOT_CHAPTERS, GOT_CHAPTER } from './ChapterReducer';
import { fetchJSON } from '../utils';

export const getChapters = () => {
    return (dispatch: any) => {
        dispatch({ type: FETCH_CHAPTERS });
        return fetchJSON({ url: '/chapter/all' })
            .then((result) => {
                dispatch({ type: GOT_CHAPTERS, payload: result.body });
            })
            .catch((e) => console.log(e + ''));
    };
};

export const getChapter = ({ id }: { id: string | undefined }) => {
    return (dispatch: any) => {
        return fetchJSON({ url: `/chapter/${id}` })
            .then((result) => {
                dispatch({ type: GOT_CHAPTER, payload: result.body });
            })
            .catch((e) => console.log(e + ''));
    };
};

export const updateChapter = ({
    id,
    characterOrder,
    locationOrder,
}: {
    id: string;
    characterOrder?: number[];
    locationOrder?: number[];
}) => {
    return (dispatch: any) => {
        return fetchJSON({ url: '/chapter/1', method: 'PATCH', body: { id, characterOrder, locationOrder } })
            .then((result) => {
                //dispatch({ type: GOT_CHARACTERS, payload: result.body });
            })
            .catch((e) => console.log(e + ''));
    };
};
