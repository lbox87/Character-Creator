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

describe('Test Delete Functions', function() {
  before(function() {
    return runServer(DATABASE_URL);
  });

  after(function() {
    return closeServer();
  });
  

});

