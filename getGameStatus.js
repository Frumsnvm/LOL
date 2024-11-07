const getGameStatus = (board) => {
    const xCount = countSymbol(board, 'X');
    const oCount = countSymbol(board, 'O');

    // Základní pravidlo: Křížek (X) začíná
    if (xCount > oCount + 1 || oCount > xCount) {
        throw new Error("Invalid game state: X should have equal or one more than O");
    }

    const totalMoves = xCount + oCount;

    if (totalMoves <= 5) {
        return 'Zahájení';
    } else if (totalMoves >= 6) {
        return checkEndgameCondition(board, totalMoves);
    }
};

const countSymbol = (board, symbol) => {
    return board.flat().filter(cell => cell === symbol).length;
};

const checkEndgameCondition = (board, totalMoves) => {
    const potentialWin = checkPotentialWin(board);

    if (potentialWin) {
        return 'Koncovka';
    } else {
        return 'Střední hra';
    }
};

const checkPotentialWin = (board) => {
    // Zkontrolujeme možné výherní pozice pro "X" (křížek)
    for (let row = 0; row < 15; row++) {
        for (let col = 0; col < 15; col++) {
            if (board[row][col] === 'X') {
                if (checkFourInARow(board, row, col)) {
                    return true;
                }
            }
        }
    }
    return false;
};

const checkFourInARow = (board, row, col) => {
    const directions = [
        { x: 1, y: 0 },  // horizontálně
        { x: 0, y: 1 },  // vertikálně
        { x: 1, y: 1 },  // diagonálně /
        { x: 1, y: -1 }  // diagonálně \
    ];

    for (const { x, y } of directions) {
        let count = 1;
        let blocked = false;

        // Kontrola jedním směrem
        for (let step = 1; step <= 4; step++) {
            const newRow = row + step * y;
            const newCol = col + step * x;

            if (isWithinBounds(newRow, newCol) && board[newRow][newCol] === 'X') {
                count++;
            } else {
                blocked = true; // Blokováno
                break;
            }
        }

        // Kontrola opačným směrem
        for (let step = 1; step <= 4; step++) {
            const newRow = row - step * y;
            const newCol = col - step * x;

            if (isWithinBounds(newRow, newCol) && board[newRow][newCol] === 'X') {
                count++;
            } else {
                blocked = true; // Blokováno
                break;
            }
        }

        // Pokud máme čtyři a je blokované, není výhra
        if (count === 4 && blocked) {
            return false;
        }

        if (count >= 5) {
            return true;
        }
    }
    return false;
};

const isWithinBounds = (row, col) => {
    return row >= 0 && row < 15 && col >= 0 && col < 15;
};
