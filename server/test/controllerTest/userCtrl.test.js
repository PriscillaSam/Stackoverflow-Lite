import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';
import users from '../testData';

chai.use(chaiHttp);
const { expect } = chai;

let userToken;
let askerToken;

describe('POST api/v1/auth/signup', () => {
  it('should return an error if user already exists', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(users.existingUser)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(409);
        expect(res).to.be.an('object');
        expect(res.body.status).to.deep.equals('error');
        expect(res.body.message).to.deep.equals('This email is already in use');
        done();
      });
  });
  it('should create a new user if signup is successful', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(users.newUser)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(201);
        expect(res).to.be.an('object');
        expect(res.body).to.have
          .keys('status', 'message', 'token', 'name', 'user_id');
        expect(res.body.status).to.deep.equals('success');
        expect(res.body.message).to.deep
          .equals('Hi Sam-Iduh Priscilla. Welcome to Stackoverflow-Lite');
        done();
      });
  });
});

describe('POST api/v1/auth/login', () => {
  it('should login user if user exists', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(users.jane)
      .end((err, res) => {
        if (err) done(err);
        userToken = res.body.token;
        expect(res).to.have.status(200);
        expect(res).to.be.an('object');
        expect(res.body).to.have
          .keys('status', 'message', 'token', 'name', 'user_id');
        expect(res.body.status).to.deep.equals('success');
        expect(res.body.message).to.deep
          .equals('Welcome back Janet Doe. Login successful');
        done();
      });
  });
  it('should return an error if user email is not found', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'priscillasa@gmail.com',
        password: 'password',
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(404);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('status', 'message');
        expect(res.body.status).to.deep.equals('error');
        done();
      });
  });
  it('should return an error if password does not match', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'sami@gmail.com',
        password: 'passwortd',
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(404);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('status', 'message');
        expect(res.body.status).to.deep.equals('error');
        done();
      });
  });
});

describe('GET api/v1/user/profile', () => {
  it('should return status 200 if user has less than 5 questions', (done) => {
    chai.request(app)
      .get('/api/v1/users/profile')
      .set('Authorization', userToken)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200);
        expect(res.body).to.haveOwnProperty('most_answered');
        done();
      });
  });

  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(users.micheal)
      .end((err, res) => {
        if (err) done(err);
        askerToken = res.body.token;
        done();
      });
  });

  it('should return status 200 if user has more than 5 questions', (done) => {
    chai.request(app)
      .get('/api/v1/users/profile')
      .set('Authorization', askerToken)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200);
        expect(res.body).to.haveOwnProperty('most_answered').lengthOf(4);
        done();
      });
  });
});
