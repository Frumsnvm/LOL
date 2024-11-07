const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public')); // Služba statických souborů

app.get('/api', (req, res) => {
    res.json({ organization: "Student Cyber Games" });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
