import React, { useEffect } from 'react';
import { ConnectedProps, connect, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { useParams } from 'react-router-dom';
import { getChapter } from './ChapterActions';

export interface ChapterInterface {
    id: number;
    title: string;
    description: string;
}

const mapStateToProps = (state: RootState) => ({
    chapter: state.chapter.currentChapter,
});
const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ChapterProps = PropsFromRedux & {
    chapter: ChapterInterface | null;
};
type ChapterParams = { id?: string | undefined };

const Chapter = ({ chapter }: ChapterProps) => {
    const dispatch = useDispatch();
    const { id } = useParams<ChapterParams>();
    useEffect(() => {
        dispatch(getChapter({ id }));
    }, [id, dispatch]);
    if (!chapter) {
        return <div>A dragon ate this chapter, how unfortunate :/</div>;
    }
    return (
        <div>
            <div>{chapter.id}</div>
            <div>{chapter.title}</div>
            <div>{chapter?.description}</div>
        </div>
    );
};

export default connector(Chapter);
