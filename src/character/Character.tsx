import React, { useState } from 'react';
import './Characters.css';
import { fetchJSON } from '../utils';
import Card from '../component/card/Card';

export interface CharacterInterface {
    id: number;
    name: string;
    age: number;
}

interface CharacterProps {
    character?: CharacterInterface;
}

const Character = ({ character }: CharacterProps) => {
    const [name, setName] = useState(character?.name);
    const [age, setAge] = useState(character?.age);

    const createCharacter = async () => {
        await fetchJSON({ url: '/character', method: 'POST', body: { name, age } });
    };

    if (character) {
        return (
            <Card>
                <p>Character name: {character.name}</p>
                <p>Character age: {character.age}</p>
            </Card>
        );
    }

    return (
        <Card>
            <p>Create new character</p>
            <label>Name</label>
            <input onChange={(e) => setName(e.target.value)} />
            <label>Age</label>
            <input onChange={(e) => setAge(parseInt(e.target.value, 10))} />
            <button onClick={() => createCharacter()}>Lagre</button>
        </Card>
    );
};

export default Character;
