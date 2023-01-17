const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');
const nodemon = require('nodemon');

const app = express();


const PORT = process.env.PORT || 3001;



app.use(express.json()); // middleware
app.use(express.static(path.join(__dirname, '/public'))); //middleware because it couldnt find css sheets.

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html')); //Route  to index.html
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html')); //Route to notes.html
});

app.get('/api/notes', (req, res) => {
    let notes = fs.readFileSync(path.join(__dirname, '/db/db.json')); //retrieving the db(displaying as json obj)
    res.json(JSON.parse(notes));
});

app.post('/api/notes', (req, res) => {
    let notes = JSON.parse(fs.readFileSync(path.join(__dirname, '/db/db.json'), 'utf8'));
    let addNote = { id: uuid.v4(), ...req.body }; //assigning random ID.
    notes.push(addNote);
    fs.writeFileSync(path.join(__dirname, '/db/db.json'), JSON.stringify(notes));
    res.json(addNote);
});

app.delete('/api/notes/:id', (req, res) => {
    let notes = JSON.parse(fs.readFileSync(path.join(__dirname, '/db/db.json'), 'utf8'));
    notes = notes.filter(note => note.id !== req.params.id);
    fs.writeFileSync(path.join(__dirname, '/db/db.json'), JSON.stringify(notes));
    res.json({ response: `Note ID: ${req.params.id} has been deleted from log.` });
});

app.listen(PORT, () => {
    console.log(`App is listening at http://localhost:${PORT}`);
});