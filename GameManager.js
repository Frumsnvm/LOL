import React, { useState } from 'react';

const GameManager = () => {
    const [games, setGames] = useState([]);
    const [currentGame, setCurrentGame] = useState(null);
    const [gameName, setGameName] = useState('');
    const [board, setBoard] = useState(Array(15).fill(null).map(() => Array(15).fill(null)));

    const createGame = () => {
        const newGame = { name: gameName, board: board.map(row => [...row]) };
        setGames([...games, newGame]);
        setGameName('');
    };

    const loadGame = (game) => {
        setCurrentGame(game);
        setBoard(game.board);
    };

    const updateGame = () => {
        const updatedGames = games.map(game => (game.name === currentGame.name ? { ...currentGame, board } : game));
        setGames(updatedGames);
    };

    const deleteGame = (gameName) => {
        const updatedGames = games.filter(game => game.name !== gameName);
        setGames(updatedGames);
        if (currentGame?.name === gameName) {
            setCurrentGame(null);
            setBoard(Array(15).fill(null).map(() => Array(15).fill(null))); // Reset board
        }
    };

    return (
        <div>
            <h2>Správa herních úloh</h2>
            <input 
                type="text" 
                value={gameName} 
                onChange={(e) => setGameName(e.target.value)} 
                placeholder="Název úlohy"
            />
            <button onClick={createGame}>Vytvořit úlohu</button>

            <h3>Uložené úlohy</h3>
            <ul>
                {games.map(game => (
                    <li key={game.name}>
                        {game.name}
                        <button onClick={() => loadGame(game)}>Načíst</button>
                        <button onClick={() => updateGame()}>Upravit</button>
                        <button onClick={() => deleteGame(game.name)}>Smazat</button>
                    </li>
                ))}
            </ul>

            <button onClick={() => setBoard(Array(15).fill(null).map(() => Array(15).fill(null)))}>
                Spustit klasickou hru
            </button>
        </div>
    );
};

export default GameManager;
