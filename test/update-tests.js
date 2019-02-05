const chai = require('chai');
const chaiHttp = require('chai-http');
const { PORT, DATABASE_URL, TEST_DATABASE_URL } = require('../config');
const { app, runServer, closeServer } = require('../server');

require('dotenv').config();
const expect = chai.expect;
chai.use(chaiHttp);

const goodPass = {
  name: "test007",
  race: "test",
  class: "test",
  level: 1,
  alignment: "test"
};

describe('Test Update and Delete Functions', function () {
  before(function () {
    return runServer(TEST_DATABASE_URL);
  });

  after(function () {
    return closeServer();
  });

  let testId;

  it('put should have response status 204', function () {
    return chai.request(app).post('/characters')
    .send(goodPass)
    .then(function (res) {
      testId = res.body.id;
      let goodParams = {
        name: "test2.0",
        id: testId
      };
      return chai.request(app).put(`/characters/${testId}`)
      .send(goodParams)
      .then(function (res) {
        expect(res).to.have.status(204);
      });
    })
  });

  it('delete should have response status 204', function () {
    return chai.request(app).delete(`/characters/${testId}`)
    .then(function (res) {
      expect(res).to.have.status(204);
    });
  });
});