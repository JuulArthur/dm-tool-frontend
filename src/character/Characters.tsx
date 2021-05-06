import React from 'react';
import Character, { CharacterInterface } from './Character';
import './Characters.css';

interface CharactersProps {
    characters: Array<CharacterInterface>;
}

const Characters = ({characters}: CharactersProps) => {
    return (
        <div className="Characters-container">
            {
                characters?.map(character => <Character character={character} key={character.name + character.age} />)
            }
            <Character />
        </div>
    );
};

export default Characters;