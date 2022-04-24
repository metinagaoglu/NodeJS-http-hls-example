const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const server = require('../../../app');
const User = require('../../../models/User');

chai.use(chaiHttp);

let userInfo = {
    name: "John",
    surname: "Doe",
    email: "johdoe@john.com",
    password: "registertest",
}

describe('POST auth/login',() => {

    before((done)=> {
        // Register before login
    }),

    it('It should be login',(done) => {
        chai.request(server)
            .post('/auth/login')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send(userInfo)
            .end((err, res) => {

                done();
            });
    })

    it('It should not be login',(done) => {
        chai.request(server)
            .post('/auth/login')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send(userInfo)
            .end((err, res) => {

                done();
            });
    })
});