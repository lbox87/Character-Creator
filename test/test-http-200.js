const chai = require('chai');
const chaiHttp = require('chai-http');

const { app, runServer, closeServer } = require('../server');
const expect = require('chai').expect;
chai.use(chaiHttp);

const statusCheck = require('../server');

describe('statusCheck', function () {
    before(function () {
        return runServer();
    });
    after(function () {
        return closeServer();
    });

    it('should respond a 200 HTTP status with intial page load', function () {

        chai.request('http://localhost:8080')
            .get('/')
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
            });

        // .then(function (res) {
        //    expect(res).to.have.status(200);
        // })
        // .catch(function (err) {
        //    throw err;
        // });
     });
    }
);