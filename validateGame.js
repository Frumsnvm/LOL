const validateGame = (board) => {
    // Kontrola rozměrů
    if (board.length !== 15 || board.some(row => row.length !== 15)) {
        throw new Error("Invalid game board size: Must be 15x15");
    }

    const xCount = countSymbol(board, 'X');
    const oCount = countSymbol(board, 'O');

    // Kontrola počtu tahů
    if (xCount > oCount + 1 || oCount > xCount) {
        throw new Error("Invalid game state: X should have equal or one more than O");
    }

    // Kontrola platnosti symbolů
    board.flat().forEach(cell => {
        if (cell && cell !== 'X' && cell !== 'O') {
            throw new Error(`Invalid symbol in game board: ${cell}`);
        }
    });

    return true; // Platná hra
};
