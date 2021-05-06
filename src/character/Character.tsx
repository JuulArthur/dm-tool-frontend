import React, { useState } from 'react';
import './Characters.css';
import { fetchJSON } from '../utils';

export interface CharacterInterface {
    name: string;
    age: number;
}

interface CharacterProps {
    character?: CharacterInterface;
}

const Character = ({character}: CharacterProps) => {
    const [name, setName] = useState(character?.name);
    const [age, setAge] = useState(character?.age);

    const createCharacter = async () => {
        await fetchJSON({url: '/character', method: 'POST', body: {name, age}})
    }

    if (character) {
        return (
            <div className="Character-container">
                <p>Character name: {character.name}</p>
                <p>Character age: {character.age}</p>
            </div>
        )
    }

    return (
        <div className="Character-container">
            <p>Create new character</p>
            <label>Name</label>
            <input onChange={(e) => setName(e.target.value)}/>
            <label>Age</label>
            <input onChange={(e) => setAge(parseInt(e.target.value, 10) )}/>
            <button onClick={() => createCharacter()}>Lagre</button>
        </div>
    );
};

export default Character;