const chai = require('chai');
const expect = require('chai').expect;


chai.request('http://localhost:8080')
    .get('/')
    .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
    });