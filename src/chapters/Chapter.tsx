import React, { useEffect } from 'react';
import { ConnectedProps, connect, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { useParams } from 'react-router-dom';
import { getChapter, updateChapter } from './ChapterActions';
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
    characterOrder?: number[];
    locationOrder?: number[];
    characterReferences?: CharacterToChapterInterface[];
}

export interface CharacterToChapterInterface {
    id: string;
    characterId: number;
    chapterId: number;
    order?: number;
}

const mapStateToProps = (state: RootState, props: any) => {
    const chapter = state.chapter.currentChapter;
    const chapterId = chapter?.id;
    const characters = chapter && getCharactersForChapter(state, chapter?.characterReferences);
    return {
        chapter,
        locations: getLocationsForChapter(state, chapterId),
        characters,
    };
};
const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ChapterProps = PropsFromRedux & {
    chapter: ChapterInterface | null;
    locations: Array<LocationInterface> | undefined;
    characters?: Array<CharacterInterface> | undefined;
    characters2?: Array<CharacterInterface>;
};
type ChapterParams = { id?: string | undefined };

const Chapter = ({ chapter, locations, characters }: ChapterProps) => {
    const dispatch = useDispatch();
    const { id } = useParams<ChapterParams>();
    useEffect(() => {
        dispatch(getLocations());
        dispatch(getCharacters());
        dispatch(getChapter({ id }));
    }, [id, dispatch]);

    const updateCharacterOrder = ({ orderList }: { orderList: Array<number> }) => {
        dispatch(updateChapter({ id: chapter.id, characterOrder: orderList }));
    };

    const updateLocationOrder = ({ orderList }: { orderList: Array<number> }) => {
        dispatch(updateChapter({ id: chapter.id, locationOrder: orderList }));
    };
    if (!chapter) {
        return <div>A dragon ate this chapter, how unfortunate :/</div>;
    }

    console.log('characters', characters);

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
                        indexOrder={chapter.locationOrder}
                        elementCreator={(location: LocationInterface) => <LocationCard location={location} />}
                        saveOrder={updateLocationOrder}
                    />
                </div>
                <div className="Chapter-contentContainer">
                    <h2>Characters</h2>
                    <DragAndDropList
                        keyPrefix="character"
                        items={characters}
                        indexOrder={chapter.characterOrder}
                        elementCreator={(character: CharacterInterface) => <Character character={character} />}
                        saveOrder={updateCharacterOrder}
                    />
                </div>
            </div>
        </div>
    );
};

export default connector(Chapter);
