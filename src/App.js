import React, { useState, useEffect } from 'react';
import Game from './Game';
import GameList from './GameList';

const App = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        // Získání seznamu her z backendu
        fetch('/api/games')
            .then(res => res.json())
            .then(data => setGames(data));
    }, []);

    const startNewGame = () => {
        // Logika pro vytvoření nové hry
    };

    return (
        <div>
            <h1>Piškvorky</h1>
            <button onClick={startNewGame}>Začít novou hru</button>
            <GameList games={games} />
        </div>
    );
};

export default App;
