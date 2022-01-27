import React from 'react';
import LocationView, { LocationInterface } from './LocationView';

interface LocationProps {
    locations: Array<LocationInterface>;
}

const Locations = ({ locations }: LocationProps) => {
    return (
        <div>
            {locations.map(location => <LocationView key={location.id} location={location}/>)}
            <LocationView />
        </div>
    );
};

export default Locations;