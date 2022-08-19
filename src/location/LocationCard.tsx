import React from 'react';
import { LocationInterface } from './LocationView';
import Card from '../component/card/Card';

type LocationPropType = { location: LocationInterface };

const LocationCard = ({ location }: LocationPropType) => {
    return (
        <Card>
            <h1>{location.name}</h1>
            <p>{location.description}</p>
            <p>{location.info}</p>
        </Card>
    );
};

export default LocationCard;
