import React, { useState } from 'react';
import Card from '../component/Card';
import { fetchJSON } from '../utils';
import { Link } from 'react-router-dom';

export interface LocationInterface {
    id: number;
    name: string;
    description: string;
    info: string;
    'orginial-content': string;
}

interface LocationProps {
    location?: LocationInterface;
}

const LocationView = ({ location }: LocationProps ) => {
    const [name, setName] = useState('');
    const [info, setInfo] = useState('');

    const createLocation = async () => {
        fetchJSON({url: '/location', method: 'POST', body: {name, info}})
    }

    if (location) {
        return (
            <Card>
                <Link to={`/location/${location.id}`}>
                    <p>id {location.id}</p>
                    <p>name {location.name}</p>
                </Link>
            </Card>
        );
    }

    return (
        <Card>
            <p>Create new location</p>
            <label>Name</label>
            <input onChange={(e) => setName(e.target.value)}/>
            <label>Info</label>
            <input onChange={(e) => setInfo(e.target.value)}/>
            <button onClick={() => createLocation()}>Lagre</button>
        </Card>
    );
};

export default LocationView;