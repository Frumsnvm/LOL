import React, { useState, useEffect } from 'react';
import { createGame, updateGame, getGameById } from './API';

const GameForm = ({ match, history }) => {
    const [gameName, setGameName] = useState('');
    const [difficulty, setDifficulty] = useState('jednoduchá');
    const [board, setBoard] = useState(Array(15).fill(null).map(() => Array(15).fill(null)));
    
    const isEdit = !!match.params.id;

    useEffect(() => {
        if (isEdit) {
            const fetchGame = async () => {
                const game = await getGameById(match.params.id);
                setGameName(game.name);
                setDifficulty(game.difficulty);
                setBoard(game.board);
            };
            fetchGame();
        }
    }, [isEdit, match.params.id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const gameData = { name: gameName, difficulty, board };
        if (isEdit) {
            await updateGame(match.params.id, gameData);
        } else {
            const newGame = await createGame(gameData);
            history.push(`/game/${newGame.id}`);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={gameName} 
                onChange={(e) => setGameName(e.target.value)} 
                placeholder="Název úlohy" 
                required 
            />
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                <option value="začátečník">Začátečník</option>
                <option value="jednoduchá">Jednoduchá</option>
                <option value="pokročilá">Pokročilá</option>
                <option value="těžká">Těžká</option>
                <option value="nejtěžší">Nejtěžší</option>
            </select>
            <button type="submit">{isEdit ? 'Upravit' : 'Vytvořit'} úlohu</button>
        </form>
    );
};

export default GameForm;
