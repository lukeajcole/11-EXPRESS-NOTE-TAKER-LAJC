const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const db = require(path.join(__dirname, '/db/db.json'));
const fs = require('fs');

const app = express();
const PORT =  3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

//Base Page Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));


app.get('/api/notes', (req, res) => res.json(db));

app.post('/api/notes', (req, res) => {

    //Log that a POST request was received
    console.info(`${req.method} request received to add a review`);
    // Destructuring assignment for the items in req.body
      const {title, text} = req.body;
      
      // const dbObj = JSON.parse(db);
    // If all the required properties are present
    if (title && text) {
      // Variable for the object we will save
      const newNote = {
        title,
        text,
        note_id: uuidv4()
      };

      db.push(newNote);
      fs.writeFile('./db/db.json', JSON.stringify(db) , (err, data) => console.log(err));
  
      const response = {
        status: 'success',
        body: newNote,
      };
  
      console.log(response);
      res.json(response);
    } else {
      res.json('Error in posting review');
    }
  });


  app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));


app.listen(PORT, () =>
  console.log(`Notes app listening at http://localhost:${PORT}`)
);
