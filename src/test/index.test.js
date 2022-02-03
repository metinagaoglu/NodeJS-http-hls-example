const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const server = require('../index');

chai.use(chaiHttp);

describe('Index page',() => {
    it('(GET / ) Tests the homepage',(done) => {
        done();
    })
})