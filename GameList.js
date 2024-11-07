import React, { useState, useEffect } from 'react';
import { getAllGames, deleteGame } from './API';

const GameList = () => {
    const [games, setGames] = useState([]);
    const [filter, setFilter] = useState({ name: '', difficulty: '', date: '' });

    useEffect(() => {
        const fetchGames = async () => {
            const allGames = await getAllGames();
            setGames(allGames);
        };
        fetchGames();
    }, []);

    const handleDelete = async (id) => {
        await deleteGame(id);
        setGames(games.filter(game => game.id !== id));
    };

    const filteredGames = games.filter(game => {
        return (
            (!filter.name || game.name.includes(filter.name)) &&
            (!filter.difficulty || game.difficulty === filter.difficulty) &&
            (!filter.date || isRecent(game.lastUpdated, filter.date))
        );
    });

    const isRecent = (date, period) => {
        const now = new Date();
        const pastDate = new Date(date);
        switch (period) {
            case '24h':
                return now - pastDate < 24 * 60 * 60 * 1000;
            case '7d':
                return now - pastDate < 7 * 24 * 60 * 60 * 1000;
            case '1m':
                return now - pastDate < 30 * 24 * 60 * 60 * 1000;
            case '3m':
                return now - pastDate < 90 * 24 * 60 * 60 * 1000;
            default:
                return true;
        }
    };

    return (
        <div>
            <h2>Seznam úloh</h2>
            <input
                type="text"
                value={filter.name}
                onChange={(e) => setFilter({ ...filter, name: e.target.value })}
                placeholder="Filtruj podle názvu"
            />
            <select
                value={filter.difficulty}
                onChange={(e) => setFilter({ ...filter, difficulty: e.target.value })}
            >
                <option value="">Všechny obtížnosti</option>
                <option value="začátečník">Začátečník</option>
                <option value="jednoduchá">Jednoduchá</option>
                <option value="pokročilá">Pokročilá</option>
                <option value="těžká">Těžká</option>
                <option value="nejtěžší">Nejtěžší</option>
            </select>
            <select
                value={filter.date}
                onChange={(e) => setFilter({ ...filter, date: e.target.value })}
            >
                <option value="">Všechny časy</option>
                <option value="24h">Za poslední 24 hodin</option>
                <option value="7d">Za posledních 7 dní</option>
                <option value="1m">Za poslední měsíc</option>
                <option value="3m">Za poslední 3 měsíce</option>
            </select>

            <ul>
                {filteredGames.map(game => (
                    <li key={game.id}>
                        <h3>{game.name} (Obtížnost: {game.difficulty})</h3>
                        <button onClick={() => handleDelete(game.id)}>Smazat</button>
                        <button onClick={() => history.push(`/game/${game.id}`)}>Spustit</button>
                        <button onClick={() => history.push(`/edit/${game.id}`)}>Upravit</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GameList;
