import React, { useEffect } from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { getChapters } from './ChapterActions';
import { ChapterInterface } from './Chapter';

const mapStateToProps = (state: RootState) => ({
    chapters: state.chapter.chapters,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type CharacterProps = PropsFromRedux & {
    chapters: Array<ChapterInterface>;
};

const Chapters = ({ chapters }: CharacterProps) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getChapters());
    }, [dispatch]);

    return (
        <div>
            {chapters.map((chapter: ChapterInterface) => (
                <a href={`/chapter/${chapter.id}`}>
                    <div>{chapter.id}</div>
                    <div>{chapter.title}</div>
                    <div>{chapter.description}</div>
                </a>
            ))}
        </div>
    );
    //return <div>hei</div>;
};

export default connector(Chapters);
