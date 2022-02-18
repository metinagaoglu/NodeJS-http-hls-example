const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const server = require('../../../index');
const User = require('../../../models/User');

chai.use(chaiHttp);

let userInfo = {
    name: "John",
    surname: "Doe",
    email: "johdoe@john.com",
    password: "registertest",
}

describe('POST auth/register',() => {

    before((done)=> {
        // delete user before register tests
        User.find({
            email: userInfo.email
        }).deleteOne(() => {
            done();
        });
    }),

    it('It should be registered',(done) => {
        chai.request(server)
            .post('/auth/register')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send(userInfo)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('status');
                res.body.status.should.equal(true);
                res.body.should.have.property('data');
                done();
            });
    })

    it('It should not be registered',(done) => {
        chai.request(server)
            .post('/auth/register')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send(userInfo)
            .end((err, res) => {
                res.should.have.status(422);
                res.body.should.be.a('object');
                res.body.should.have.property('status');
                res.body.status.should.equal(false);
                done();
            });
    })
});