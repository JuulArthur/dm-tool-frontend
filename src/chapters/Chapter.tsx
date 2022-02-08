import React, { useEffect } from 'react';
import { ConnectedProps, connect, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { useParams } from 'react-router-dom';
import { getChapter } from './ChapterActions';
import { getLocations } from '../location/LocationActions';
import { getCharacters } from '../character/CharacterActions';
import { LocationInterface } from '../location/LocationView';
import { CharacterInterface } from '../character/Character';
import { getLocationsForChapter } from '../location/LocationReducer';
import { getCharactersForChapter } from '../character/CharacterReducer';

export interface ChapterInterface {
    id: number;
    title: string;
    description: string;
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
            <h2>Locations</h2>
            <div>
                {locations.map((location: LocationInterface) => (
                    <div key={'location-' + location.id}>
                        <div>Location id: {location.id}</div>
                        <div>{location.name}</div>
                    </div>
                ))}
            </div>
            <h2>Characters</h2>
            <div>
                {characters.map((character: CharacterInterface) => (
                    <div key={'character-' + character.id}>
                        <div>Location id: {character.id}</div>
                        <div>{character.name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default connector(Chapter);
