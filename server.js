const express = require('express');
const app = express();
app.use(express.static('public'));

let server;

function runServer() {
  const port = process.env.PORT || 8080;
  return new Promise((resolve, reject) => {
    server = app.listen(port, () => {
      console.log(`Your app is listening on port ${port}`);
      resolve(server);
    })
    .on('error', err => {
      reject(err);
    });
  });
}

function closeServer() {
    return new Promise((resolve, reject) => {
        server.close(err => {
            if (err) reject(err)
            resolve(server)
        })
    })
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
};
// export defined variables and functions to be used elsewhere
// this syntax is an object that actually returns:
// {app: app, runServer: runServer, closeServer: closeServer}
module.exports = { app, runServer, closeServer }