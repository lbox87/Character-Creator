const chai = require('chai');
const chaiHttp = require('chai-http');
const { PORT, DATABASE_URL, TEST_DATABASE_URL } = require('../config');
const { app, runServer, closeServer } = require('../server');

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

describe('Test Update Functions', function () {
  before(function () {
    return runServer(TEST_DATABASE_URL);
  });

  after(function () {
    return closeServer();
  });


  // requests to create a correctly submitted character
  it('should have response status 204', function () {
    let id;
    let goodParams = {
      name: "test2",
    }
    chai.request(app).post('/characters').send(goodPass).then(function (res) {
      id = res.id;
      goodParams[_id] = id;
    });
    return chai.request(app).put('/characters' + id).send(goodParams).then(function (res) {
      expect(res).to.have.status(204);
    });

  });

});

