const express = require('express'); //Express
const path = require('path'); //Routes built in from express
const fs = require('fs'); //File System
const uuid = require('uuid'); //Recommended for creating Unique ID's
const nodemon = require('nodemon'); //constantly updates the server.

const app = express(); //invoking express


const PORT = process.env.PORT || 3001; //Learned from Mosh.


// middleware
app.use(express.json()); 
app.use(express.static(path.join(__dirname, '/public'))); //middleware because it couldnt find css sheets.


//GETS
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

//POSTS
app.post('/api/notes', (req, res) => {
    let notes = JSON.parse(fs.readFileSync(path.join(__dirname, '/db/db.json'), 'utf8'));
    let addNote = { id: uuid.v4(), ...req.body }; //assigning random ID.
    notes.push(addNote);
    fs.writeFileSync(path.join(__dirname, '/db/db.json'), JSON.stringify(notes));
    res.json(addNote);
});

//deletes note
app.delete('/api/notes/:id', (req, res) => {
    let notes = JSON.parse(fs.readFileSync(path.join(__dirname, '/db/db.json'), 'utf8'));
    notes = notes.filter(note => note.id !== req.params.id);
    fs.writeFileSync(path.join(__dirname, '/db/db.json'), JSON.stringify(notes));
    res.json({ response: `Note ID: ${req.params.id} has been deleted from log.` });
});


//Listen
app.listen(PORT, () => {
    console.log(`App is listening at http://localhost:${PORT}`); //listening for port
});