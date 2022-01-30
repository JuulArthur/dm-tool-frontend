import React, { useEffect } from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import LocationView, { LocationInterface } from './LocationView';
import { getLocations } from './LocationActions';
import { RootState } from '../store';

const mapStateToProps = (state: RootState) => ({ locations: state.location.locations });

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type LocationsProps = PropsFromRedux & {
    locations: Array<LocationInterface>;
};

const Locations = ({ locations }: LocationsProps) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getLocations());
    }, [dispatch]);

    return (
        <div>
            {locations.map((location: LocationInterface) => (
                <LocationView key={location.id} location={location} />
            ))}
            <LocationView />
        </div>
    );
};

export default connector(Locations);
