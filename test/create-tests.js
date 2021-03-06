const chai = require('chai');
const chaiHttp = require('chai-http');
const { PORT, DATABASE_URL, TEST_DATABASE_URL } = require('../config');
const {app, runServer, closeServer} = require('../server');

require('dotenv').config();
const expect = chai.expect;
chai.use(chaiHttp);

const goodPass = {
  name: "test",
  race: "test",
  class: "test",
  level: 1,
  alignment: "test"
};

const badPass = {
  name: "test"
};

describe('Test Create Functions', function() {
  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  after(function() {
    return closeServer();
  });

  it('should have response status 201 for correct post', function () {
    return chai.request(app)
      .post('/characters')
      .send(goodPass)
      .then(function (res) {
        expect(res).to.have.status(201);
      });
  });

  it('should have response status 500 for incorrect post', function() {
    return chai.request(app)
      .post('/characters')
      .send(badPass)
      .then(function(res) {
        expect(res).to.have.status(400);
      });
  });
});

