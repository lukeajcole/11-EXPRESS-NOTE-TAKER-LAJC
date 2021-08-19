const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');


const app = express();
const PORT = 3001;

app.use(express.static('public'));

//Base Page Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

app.get('/api/notes', (req, res) => res.json(path.join(__dirname, '/db/db.json')));

app.post('/api/notes', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a review`);
  
    // Destructuring assignment for the items in req.body
    const {title, text} = req.body;
  
    // If all the required properties are present
    if (title && text) {
      // Variable for the object we will save
      const newNote = {
        title,
        text,
        note_id: uuidv4()
      };
  
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


app.listen(PORT, () =>
  console.log(`Notes app listening at http://localhost:${PORT}`)
);