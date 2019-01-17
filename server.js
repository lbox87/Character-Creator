const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('public'));


const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const { PORT, DATABASE_URL } = require('./config');
const { Character } = require('./models');

// GET requests to /characters => return 10 characters
app.get('/characters', (req, res) => {
  Character
    .find()
    .limit(10)   
    .then(characters => {
      res.json({
        characters: characters.map(
          (characters) => characters.serialize())
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

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



// function runServer() {
//   const port = process.env.PORT || 8080;
//   return new Promise((resolve, reject) => {
//     server = app.listen(port, () => {
//       console.log(`Your app is listening on port ${port}`);
//       resolve(server);
//     })
//     .on('error', err => {
//       reject(err);
//     });
//   });
// }

// function closeServer() {
//     return new Promise((resolve, reject) => {
//         server.close(err => {
//             if (err) reject(err)
//             resolve(server)
//         })
//     })
// }

// if (require.main === module) {
//   runServer().catch(err => console.error(err));
// };

// export defined variables and functions to be used elsewhere
// this syntax is an object that actually returns:
// {app: app, runServer: runServer, closeServer: closeServer}
module.exports = { app, runServer, closeServer }