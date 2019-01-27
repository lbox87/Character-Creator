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
  
  it('should have response with characters in a json', function() {
    return chai.request(app)
      .get('/')
      .then(function(res) {
        expect(res).to.have.status(200);
      });
  });
});