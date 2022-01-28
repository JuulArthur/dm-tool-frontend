import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import LocationView, { LocationInterface } from './LocationView';
import { getLocations } from '../actions/LocationActions';

interface LocationProps {
    locations: Array<LocationInterface>;
}

const mapStateToProps = (state: any) => ({ locations: state.locations.locations });

const Locations = ({ locations }: LocationProps) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getLocations());
    }, []);

    return (
        <div>
            {locations.map((location) => (
                <LocationView key={location.id} location={location} />
            ))}
            <LocationView />
        </div>
    );
};

export default connect(mapStateToProps)(Locations);
