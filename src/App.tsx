import React, { useEffect, useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import './App.css';
import { fetchJSON } from './utils';
import Characters from './character/Characters';

interface Character {
    name: string;
    age: number;
}

const App = () => {
    const [characters, setCharacters] = useState<Array<Character>>([]);
    useEffect(() => {
        fetchJSON({ url: '/character/all' })
            .then((result) => {
                setCharacters(result.body);
            })
            .catch((e) => console.log(e + ''));
    }, []);
    return (
        <div className="App">
            <header className="App-header">
                <ul className="App-linkContainer">
                    <li>
                        <Link to="/" className="App-link">Home</Link>
                    </li>
                    <li>
                        <Link to="/characters" className="App-link">Characters</Link>
                    </li>
                </ul>
            </header>
            <Switch>
                <Route path="/characters">
                    <Characters characters={characters}/>

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
