const chai = require('chai');
const chaiHttp = require('chai-http');
const { PORT, DATABASE_URL, TEST_DATABASE_URL } = require('../config');
const { app, runServer, closeServer } = require('../server');

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

describe('Test Update Functions', function () {
  before(function () {
    return runServer(DATABASE_URL);
  });

  after(function () {
    return closeServer();
  });


  // requests to create a correctly submitted character
  it('should have response status 204', function () {

    chai.request(app).post('/characters').send(goodPass).then(function (res) {
      let goodParams = {
        name: "test2",
        id: res.id
      }
      return chai.request(app).put('/characters/' + res.id).send(JSON.stringify(goodParams)).then(function (res) {
        // expect(res).to.have.name("test2");
        expect(res).to.have.status(204);
        
      });
    });
  });

});

