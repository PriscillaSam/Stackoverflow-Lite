/* eslint max-len: 0 */

import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';

chai.use(chaiHttp);
const { expect } = chai;

const user = {
  name: 'Sam-Iduh Priscilla',
  email: 'priscillasam@gmail.com',
  password: 'password',
};


describe('POST api/v1/auth/signup', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        done();
      });
  });
  it('should return an error if user already exists', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(409);
        expect(res).to.be.an('object');
        expect(res.body.status).to.deep.equals('error');
        expect(res.body.message).to.deep.equals('this email is already in use');
        done();
      });
  });
  it('should create a new user if signup is successful', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        name: 'Sam-Iduh Priscilla',
        email: 'priscillaiduh@gmail.com',
        password: 'password',
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(201);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('status', 'message', 'token');
        expect(res.body.status).to.deep.equals('success');
        expect(res.body.message).to.deep.equals('Hi Sam-Iduh Priscilla. Welcome to Stackoverflow-Lite');
        done();
      });
  });
});
