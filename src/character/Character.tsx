import React from 'react';
import './Characters.css';

export interface CharacterInterface {
    name: string;
    age: number;
}

interface CharacterProps {
    character: CharacterInterface;
}

const Character = ({character}: CharacterProps) => {
    return (
        <div className="Character-container">
            <p>Character name: {character.name}</p>
            <p>Character age: {character.age}</p>
        </div>
    );
};

export default Character;