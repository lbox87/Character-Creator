const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('public'));


const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const { PORT, DATABASE_URL } = require('./config');
const { Character } = require('./models');
// ---------------------------------------------------
// GET requests to /characters => return 10 characters
app.get('/characters', (req, res) => {
  Character
    .find()
    // .limit(10)   
    .then(characters => {
      console.log(characters);
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

// can also request by ID
app.get('/characters/:id', (req, res) => {
  Character
    // this is a convenience method Mongoose provides for searching
    // by the object _id property
    .findById(req.params.id)
    .then(character => res.json(character.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});


app.post('/characters', (req, res) => {
  console.log(req);
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
    .then(character => res.status(201).json(character.serialize()))
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

  // we only support a subset of fields being updateable.
  // if the user sent over any of the updatableFields, we udpate those values
  // in document
  const toUpdate = {};
  const updateableFields = ['name', 'race', 'class', 'level', 'alignment'];

  updateableFields.forEach(field => {
    if (field in req.body) {
      toUpdate[field] = req.body[field];
    }
  });

  Character
    // all key/value pairs in toUpdate will be updated -- that's what `$set` does
    .findByIdAndUpdate(req.params.id, { $set: toUpdate })
    .then(character => res.status(204).end())
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

// ---------------------------------------------------
let server;


function runServer(databaseUrl, port = PORT) {
  // throw new Error (databaseUrl);
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

// this function closes the server, and returns a promise. we'll
// use it in our integration tests later.
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

// export defined variables and functions to be used elsewhere
// this syntax is an object that actually returns:
// {app: app, runServer: runServer, closeServer: closeServer}
module.exports = { app, runServer, closeServer }
module.exports = { }