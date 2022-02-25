const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const server = require('../app');

chai.use(chaiHttp);

describe('NodeJS client pages',() => {
    it('(GET / ) Tests the homepage',(done) => {
        chai.request(server)
            .get('/api')
            .end((err,res) => {
                res.should.have.status(401);
                done();
            });
    });
});