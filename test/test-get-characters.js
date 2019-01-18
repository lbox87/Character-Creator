const chai = require('chai');
const chaiHttp = require('chai-http');
const { PORT, DATABASE_URL } = require('../config');
const {app, runServer, closeServer} = require('../server');

const expect = chai.expect;
chai.use(chaiHttp);

describe('getCharacters', function() {
  before(function() {
    return runServer(DATABASE_URL);
  });

  after(function() {
    return closeServer();
  });
  // `chai.request.get` is an asynchronous operation. When
  // using Mocha with async operations, we need to either
  // return an ES6 promise or else pass a `done` callback to the
  // test that we call at the end. We prefer the first approach, so
  // we just return the chained `chai.request.get` object.
  it('should have response with characters in a json', function() {
    return chai.request(app)
      .get('/')
      .then(function(res) {
        expect(res).to.have.status(200);
      });
  });
});