const chai = require('chai');
const chaiHttp = require('chai-http');
const { PORT, DATABASE_URL } = require('../config');
// Import server.js and use destructuring assignment to create variables for
// server.app, server.runServer, and server.closeServer
// Below is what the deconstructing is the long version importing...
// ...the app, runServer, and closeServer from server.js and defining them in this test
// const server = require('../server')
// const app = server.app;
// const runServer = server.runServer;
// const closeServer = server.closeServer;
const {app, runServer, closeServer} = require('../server');

const expect = chai.expect;
chai.use(chaiHttp);

describe('Test Initial Page Load', function() {
  // Before our tests run, we activate the server. Our `runServer`
  // function returns a promise, and we return the promise by
  // doing `return runServer`. If we didn't return a promise here,
  // there's a possibility of a race condition where our tests start
  // running before our server has started.
  before(function() {
    return runServer(DATABASE_URL);
  });
  // Close server after these tests run in case
  // we have other test modules that need to 
  // call `runServer`. If server is already running,
  // `runServer` will error out.
  after(function() {
    return closeServer();
  });
  // `chai.request.get` is an asynchronous operation. When
  // using Mocha with async operations, we need to either
  // return an ES6 promise or else pass a `done` callback to the
  // test that we call at the end. We prefer the first approach, so
  // we just return the chained `chai.request.get` object.
  it('should have response status 200 on initial GET', function() {
    return chai.request(app)
      .get('/')
      .then(function(res) {
        expect(res).to.have.status(200);
      });
  });
});