import { FETCH_CHAPTERS, GOT_CHAPTERS, GOT_CHAPTER } from './ChapterReducer';
import { fetchJSON } from '../utils';
import { CharacterToChapterInterface } from './Chapter';

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

export const updateChapter = ({ id, title, description }: { id: string; title?: string; description?: string }) => {
    return (dispatch: any) => {
        return fetchJSON({ url: '/chapter/1', method: 'PATCH', body: { id, title, description } })
            .then((result) => {
                dispatch({ type: GOT_CHAPTER, payload: result.body });
            })
            .catch((e) => console.log('Something went wrong when updating chapter: ' + e));
    };
};

export const updateCharacterOrderForChapter = ({
    characterOrder,
}: {
    characterOrder: CharacterToChapterInterface[];
}) => {
    return (dispatch: any) => {
        return fetchJSON({ url: '/chapter/characterOrder', method: 'POST', body: { characterOrder } })
            .then((result) => {
                //dispatch({ type: GOT_CHARACTERS, payload: result.body });
            })
            .catch((e) => console.log('Something went wrong when updating character order: ' + e));
    };
};

export const updateLocationOrderForChapter = ({ locationOrder }: { locationOrder: any[] }) => {
    return (dispatch: any) => {
        return fetchJSON({ url: '/chapter/locationOrder', method: 'POST', body: { locationOrder } })
            .then((result) => {
                //dispatch({ type: GOT_CHARACTERS, payload: result.body });
            })
            .catch((e) => console.log('Something went wrong when updating location order: ' + e));
    };
};
