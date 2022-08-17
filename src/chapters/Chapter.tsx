import React, { useEffect, useState } from 'react';
import { ConnectedProps, connect, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { useParams } from 'react-router-dom';
import {
    getChapter,
    updateChapter,
    updateCharacterOrderForChapter,
    updateLocationOrderForChapter,
} from './ChapterActions';
import { getLocations } from '../location/LocationActions';
import { getCharacters } from '../character/CharacterActions';
import { LocationInterface } from '../location/LocationView';
import Character, { CharacterInterface } from '../character/Character';
import { getLocationsForChapter } from '../location/LocationReducer';
import { getCharactersForChapter } from '../character/CharacterReducer';
import DragAndDropList from '../component/dragAndDropList/DragAndDropList';
import './Chapter.css';
import LocationCard from '../location/LocationCard';
import EditableField from '../component/editableField/EditableField';

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
    const characters = chapter?.id && getCharactersForChapter(state, chapter?.characterReferences);
    const locations = chapter?.id && getLocationsForChapter(state, chapter?.locationReferences);
    return {
        chapter,
        locations,
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
    const [characterOrder, setCharacterOrder] = useState([]);
    const [locationOrder, setLocationOrder] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        dispatch(getLocations());
        dispatch(getCharacters());
        // @ts-ignore
        dispatch(getChapter({ id })).then(() => {
            setIsLoading(false);
        });
    }, [id, dispatch]);

    useEffect(() => {
        if (characters) {
            setCharacterOrder(characters.sort((a: any, b: any) => a.order - b.order).map((a: any) => a.id));
        }
        if (locations) {
            setLocationOrder(locations.sort((a: any, b: any) => a.order - b.order).map((a: any) => a.id));
        }
    }, [characters, locations]);

    const updateCharacterOrder = ({ orderList }: { orderList: any[] }) => {
        const characterOrder = orderList.map((element, index) => ({
            id: element.characterReferenceId,
            characterId: element.id,
            chapterId: chapter.id,
            order: index,
        }));
        dispatch(updateCharacterOrderForChapter({ characterOrder }));
    };

    const updateLocationOrder = ({ orderList }: { orderList: any[] }) => {
        const locationOrder = orderList.map((element, index) => ({
            locationId: element.id,
            chapterId: chapter.id,
            order: index,
        }));
        dispatch(updateLocationOrderForChapter({ locationOrder: locationOrder }));
    };
    if (isLoading) {
        return <div>You must gather your party before venturing forth!</div>;
    }
    if (!chapter?.id) {
        if (Math.random() >= 0.5) {
            return <div>A dragon ate this chapter, how unfortunate :/</div>;
        } else {
            return <div>This chapter does not seem to have been written yet. Do you live in the future?</div>;
        }
    }

    return (
        <div>
            <EditableField
                text={chapter.title}
                onSave={(text) => dispatch(updateChapter({ id: chapter.id, title: text }))}
            >
                <h1>
                    {chapter.id} - {chapter.title}
                </h1>
            </EditableField>
            <EditableField onSave={(text) => dispatch(updateChapter({ id: chapter.id, description: text }))}>
                <div>{chapter?.description}</div>
            </EditableField>
            <div className="Chapter-container">
                <div className="Chapter-contentContainer">
                    <h2>Locations</h2>
                    <DragAndDropList
                        keyPrefix="location"
                        items={locations}
                        indexOrder={locationOrder}
                        elementCreator={(location: LocationInterface) => <LocationCard location={location} />}
                        saveOrder={updateLocationOrder}
                    />
                </div>
                <div className="Chapter-contentContainer">
                    <h2>Characters</h2>
                    <DragAndDropList
                        keyPrefix="character"
                        items={characters}
                        indexOrder={characterOrder}
                        elementCreator={(character: CharacterInterface) => <Character character={character} />}
                        saveOrder={updateCharacterOrder}
                    />
                </div>
            </div>
        </div>
    );
};

export default connector(Chapter);
