import React, { useEffect } from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import Character, { CharacterInterface } from './Character';
import './Characters.css';
import { RootState } from '../store';
import { getCharacters } from './CharacterActions';

//https://redux.js.org/usage/usage-with-typescript
const mapStateToProps = (state: RootState) => ({
    characters: state.character.characters,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type CharactersProps = PropsFromRedux & {
    characters: Array<CharacterInterface>;
};

const Characters = (props: CharactersProps) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCharacters());
    }, [dispatch]);
    return (
        <div className="Characters-container">
            {props.characters?.map((character: CharacterInterface) => (
                <Character character={character} key={character.name + character.age} />
            ))}
            <Character />
        </div>
    );
};

export default connector(Characters);
