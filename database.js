const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:'); // Použití paměťové databáze

db.serialize(() => {
    db.run(`CREATE TABLE games (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        player1 TEXT,
        player2 TEXT,
        gameState TEXT DEFAULT 'unknown'
    )`);
});

module.exports = db;
