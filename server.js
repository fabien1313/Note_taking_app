const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');

const app = express();


const PORT = process.env.PORT || 3001;



app.use(express.json()); // middleware

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    let notes = fs.readFileSync(path.join(__dirname, '/db/db.json'));
    res.json(JSON.parse(notes));

})




app.listen(PORT, () => {
    console.log(`App is listening at http://localhost:${PORT}`);
});