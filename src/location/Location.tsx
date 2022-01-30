import React, { useEffect } from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../store';
import { LocationInterface } from './LocationView';
import { getLocation } from './LocationActions';

const mapStateToProps = (state: RootState) => ({
    location: state.location.currentLocation,
});
const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type LocationPropType = PropsFromRedux & { location: LocationInterface | null };

type LocationParams = { id?: string | undefined };

const Location = ({ location }: LocationPropType) => {
    const { id } = useParams<LocationParams>();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getLocation({ id }));
    }, [id, dispatch]);
    if (!location) {
        return null;
    }

    return (
        <div>
            <h1>{location.name}</h1>
            <label>Info</label>
            <p>{location.info}</p>
            <label>Description</label>
            <p>{location.description}</p>
            <label>Original content</label>
            <p>{location.originalContent}</p>
        </div>
    );
};

export default connector(Location);
