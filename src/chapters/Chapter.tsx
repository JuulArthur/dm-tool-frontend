import React, { useEffect, useRef } from 'react';
import { ConnectedProps, connect, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { useParams } from 'react-router-dom';
import { getChapter } from './ChapterActions';
import { getLocations } from '../location/LocationActions';
import { getCharacters } from '../character/CharacterActions';
import { LocationInterface } from '../location/LocationView';
import Character, { CharacterInterface } from '../character/Character';
import { getLocationsForChapter } from '../location/LocationReducer';
import { getCharactersForChapter } from '../character/CharacterReducer';
import DragAndDropList from '../component/dragAndDropList/DragAndDropList';
import './Chapter.css';
import LocationCard from '../location/LocationCard';

export interface ChapterInterface {
    id: number;
    title: string;
    description: string;
    characterOrder: number[] | null;
}

const mapStateToProps = (state: RootState, props: any) => {
    const chapter = state.chapter.currentChapter;
    const chapterId = chapter?.id;
    return {
        chapter,
        locations: getLocationsForChapter(state, chapterId),
        characters: getCharactersForChapter(state, chapterId),
    };
};
const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ChapterProps = PropsFromRedux & {
    chapter: ChapterInterface | null;
    locations: Array<LocationInterface> | undefined;
    characters: Array<CharacterInterface> | undefined;
};
type ChapterParams = { id?: string | undefined };

const Chapter = ({ chapter, locations, characters }: ChapterProps) => {
    const dispatch = useDispatch();
    const { id } = useParams<ChapterParams>();
    useEffect(() => {
        dispatch(getChapter({ id }));
        dispatch(getLocations());
        dispatch(getCharacters());
    }, [id, dispatch]);
    if (!chapter) {
        return <div>A dragon ate this chapter, how unfortunate :/</div>;
    }

    return (
        <div>
            <h1>
                {chapter.id} - {chapter.title}
            </h1>
            <div>{chapter?.description}</div>
            <div className="Chapter-container">
                <div className="Chapter-contentContainer">
                    <h2>Locations</h2>
                    <DragAndDropList
                        keyPrefix="location"
                        items={locations}
                        indexOrder={[]}
                        elementCreator={(location: LocationInterface) => <LocationCard location={location} />}
                    />
                </div>
                <div className="Chapter-contentContainer">
                    <h2>Characters</h2>
                    <DragAndDropList
                        keyPrefix="character"
                        items={characters}
                        indexOrder={chapter.characterOrder}
                        elementCreator={(character: CharacterInterface) => <Character character={character} />}
                    />
                </div>
            </div>
        </div>
    );
};

export default connector(Chapter);
