const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('public'));
require('dotenv').config();

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const { PORT, DATABASE_URL } = require('./config');
const { Character } = require('./models');

app.get('/characters', (req, res) => {
  Character
    .find()
    .then(characters => {
      res.json({
        characters: characters.map(
          (character) => character.serialize())
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

app.get('/summary', (req, res) => {
  Character
    .find()
    .limit(10)
    .then(characters => {
      res.json({
        characters: characters.map(
          (character) => character.serialize())
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

app.get('/characters/:id', (req, res) => {
  Character
    .findById(req.params.id)
    .then(character => res.json(character.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

app.post('/characters', (req, res) => {
  const requiredFields = ['name', 'race', 'class'];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }
  Character
    .create({
      name: req.body.name,
      race: req.body.race,
      class: req.body.class,
      level: req.body.level,
      alignment: req.body.alignment
    })
    .then(character => {
      res.status(201).json(character.serialize())
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

app.put('/characters/:id', (req, res) => {
  // ensure that the id in the request path and the one in request body match
  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    const message = (
      `Request path id (${req.params.id}) and request body id ` +
      `(${req.body.id}) must match`);
    console.error(message);
    return res.status(400).json({ message: message });
  }

  const toUpdate = {};
  const updateableFields = ['name', 'race', 'class', 'level', 'alignment'];

  updateableFields.forEach(field => {
    if (field in req.body) {
      toUpdate[field] = req.body[field];
    }
  });

  Character
    // all key/value pairs in toUpdate will be updated using `$set`
    .findByIdAndUpdate(req.params.id, { $set: toUpdate })
    .then(character => {
      res.status(204).json(character.serialize());
    })
    .catch(err => res.status(500).json({ message: 'Internal server error' }));
});

app.delete('/characters/:id', (req, res) => {
  Character
    .findByIdAndRemove(req.params.id)
    .then(character => res.status(204).end())
    .catch(err => res.status(500).json({ message: 'Internal server error' }));
});

// catch-all endpoint if client makes request to non-existent endpoint
app.use('*', function (req, res) {
  res.status(404).json({ message: 'Not Found' });
});

let server;

function runServer(databaseUrl, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer }