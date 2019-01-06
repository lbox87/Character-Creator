const chai = require('chai');
const chaiHttp = require('chai-http');

// Import server.js and use destructuring assignment to create variables for
// server.app, server.runServer, and server.closeServer
const {app, runServer, closeServer} = require('../server');

// declare a variable for expect from chai import
const expect = chai.expect;

chai.use(chaiHttp);

chai.request('http://localhost:8080')
    .get('/')
    // .end(function (err, res) {
    //     expect(err).to.be.null;
    //     expect(res).to.have.status(200);
    // });


    .then(function (res) {
       expect(res).to.have.status(200);
    })
    .catch(function (err) {
       throw err;
    });