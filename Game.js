import React, { useState } from 'react';
import './styles.css'; // Import stylů

const Game = () => {
    const size = 15; // Velikost herní plochy
    const [board, setBoard] = useState(Array(size).fill(null).map(() => Array(size).fill(null)));
    const [isXNext, setIsXNext] = useState(true);
    const [winner, setWinner] = useState(null);

    const handleClick = (row, col) => {
        if (board[row][col] || winner) return; // Pokud je pole již obsazené nebo je vítěz, neprovádějte nic

        const newBoard = board.map(arr => arr.slice());
        newBoard[row][col] = isXNext ? 'X' : 'O';
        setBoard(newBoard);
        setIsXNext(!isXNext);
        checkWinner(newBoard, row, col);
    };

    const checkWinner = (board, row, col) => {
        const symbol = board[row][col];
        const directions = [
            { x: 1, y: 0 },  // horizontálně
            { x: 0, y: 1 },  // vertikálně
            { x: 1, y: 1 },  // diagonálně /
            { x: 1, y: -1 }  // diagonálně \
        ];

        for (const { x, y } of directions) {
            let count = 1;

            // Zkontrolovat jednu stranu
            count += countDirection(board, row, col, x, y, symbol);
            // Zkontrolovat opačnou stranu
            count += countDirection(board, row, col, -x, -y, symbol);

            if (count >= 5) {
                setWinner(symbol);
                return;
            }
        }
    };

    const countDirection = (board, row, col, x, y, symbol) => {
        let count = 0;
        let r = row + y;
        let c = col + x;

        while (r >= 0 && r < size && c >= 0 && c < size && board[r][c] === symbol) {
            count++;
            r += y;
            c += x;
        }
        return count;
    };

    const renderSquare = (row, col) => (
        <button className="square" onClick={() => handleClick(row, col)}>
            {board[row][col]}
        </button>
    );

    return (
        <div className="game">
            <h2>{winner ? `Vítěz: ${winner}` : `Hráč: ${isXNext ? 'X' : 'O'}`}</h2>
            <div className="board">
                {board.map((row, rowIndex) => (
                    <div key={rowIndex} className="board-row">
                        {row.map((_, colIndex) => renderSquare(rowIndex, colIndex))}
                    </div>
                ))}
            </div>
            <button onClick={() => setBoard(Array(size).fill(null).map(() => Array(size).fill(null))) || setWinner(null)}>Restartovat hru</button>
        </div>
    );
};

export default Game;
