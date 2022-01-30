import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import './App.css';
import Characters from './character/Characters';
import Locations from './location/Locations';
import Location from './location/Location';
import Chapters from './chapters/Chapters';
import Chapter from './chapters/Chapter';

const App = () => {
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
                <li>
                    <Link to="/chapters" className="App-link">
                        Chapters
                    </Link>
                </li>
            </header>
            <Switch>
                <Route path="/chapters">
                    <Chapters />
                </Route>
                <Route path="/chapter/:id">
                    <Chapter />
                </Route>
                <Route path="/characters">
                    <Characters />
                </Route>
                <Route path="/locations">
                    <Locations />
                </Route>
                <Route path="/location/:id">
                    <Location />
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
