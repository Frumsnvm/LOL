const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Endpoint pro vytvoření nové hry
app.post('/games', (req, res) => {
    const { player1, player2 } = req.body;
    db.run(`INSERT INTO games (player1, player2) VALUES (?, ?)`, [player1, player2], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID, player1, player2, gameState: 'unknown' });
    });
});

// Endpoint pro získání všech her
app.get('/games', (req, res) => {
    db.all(`SELECT * FROM games`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Endpoint pro získání jedné hry
app.get('/games/:id', (req, res) => {
    const { id } = req.params;
    db.get(`SELECT * FROM games WHERE id = ?`, [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ message: 'Game not found' });
        }
        res.json(row);
    });
});

// Endpoint pro aktualizaci hry
app.put('/games/:id', (req, res) => {
    const { id } = req.params;
    const { player1, player2, gameState } = req.body;

    db.run(`UPDATE games SET player1 = ?, player2 = ?, gameState = ? WHERE id = ?`, 
        [player1, player2, gameState, id], function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ message: 'Game not found' });
            }
            res.json({ message: 'Game updated' });
        });
});

// Endpoint pro mazání hry
app.delete('/games/:id', (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM games WHERE id = ?`, [id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Game not found' });
        }
        res.json({ message: 'Game deleted' });
    });
});

// Start serveru
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
