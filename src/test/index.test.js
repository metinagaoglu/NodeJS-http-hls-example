const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const server = require('../index');

chai.use(chaiHttp);

describe('NodeJS client pages',() => {
    it('(GET / ) Tests the homepage',(done) => {
        chai.request(server)
            .get('/')
            .end((err,res) => {
                res.should.have.status(200);
                done();
            });
    });
});