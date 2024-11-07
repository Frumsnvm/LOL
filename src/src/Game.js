import React, { useState } from 'react';

const Game = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);

    const handleClick = (index) => {
        const newBoard = board.slice();
        if (calculateWinner(board) || board[index]) return;
        newBoard[index] = xIsNext ? 'X' : 'O';
        setBoard(newBoard);
        setXIsNext(!xIsNext);
        // Uložení hry na backend
    };

    const renderSquare = (index) => (
        <button onClick={() => handleClick(index)}>
            {board[index]}
        </button>
    );

    return (
        <div>
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    );
};

const calculateWinner = (squares) => {
    // Logika pro určení vítěze
};

export default Game;
