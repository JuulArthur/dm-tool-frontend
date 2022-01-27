import React, { useEffect, useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import './App.css';
import { fetchJSON } from './utils';
import Characters from './character/Characters';
import Locations from './location/Locations';
import { LocationInterface } from './location/LocationView';

const App = () => {
    const [locations, setLocations] = useState<Array<LocationInterface>>([]);
    useEffect(() => {
        fetchJSON({ url: '/location/all' })
            .then((result) => {
                setLocations(result.body);
            })
            .catch((e) => console.log(e + ''));
    }, []);
    return (
        <div className="App">
            <header className="App-header">
                <ul className="App-linkContainer">
                    <li>
                        <Link to="/" className="App-link">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/characters" className="App-link">
                            Characters
                        </Link>
                    </li>
                    <li>
                        <Link to="/locations" className="App-link">
                            Locations
                        </Link>
                    </li>
                </ul>
            </header>
            <Switch>
                <Route path="/characters">
                    <Characters />
                </Route>
                <Route path="/locations">
                    <Locations locations={locations} />
                </Route>
                <Route path="/">
                    <h2>Main page</h2>
                </Route>
                <Route>
                    <h2>Nothing here</h2>
                </Route>
            </Switch>
        </div>
    );
};

export default App;
