import React from 'react';

const GameList = ({ games }) => {
    return (
        <div>
            <h2>Seznam her</h2>
            <ul>
                {games.map((game, index) => (
                    <li key={index}>{game.name} - {game.status}</li>
                ))}
            </ul>
        </div>
    );
};

export default GameList;
