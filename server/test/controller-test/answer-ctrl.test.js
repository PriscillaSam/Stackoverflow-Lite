import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';

chai.use(chaiHttp);
const { expect } = chai;

describe('POST api/v1/questions/:questionId/answers', () => {
  it('should return a status code 404 if user does not exist', (done) => {
    chai.request(app)
      .post('/api/v1/questions/1/answers')
      .send({
        userId: 20,
        answer: 'This is a test answer',
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(404);
        expect(res).to.be.an('object');
        expect(res.body.status).to.deep.equals('error');
        expect(res.body.message).to.deep.equals('this user does not exist');
        done();
      });
  });
  it('should return status 404 if question does not exist', (done) => {
    chai.request(app)
      .post('/api/v1/questions/20/answers')
      .send({
        userId: 2,
        answer: 'This is a test answer',
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(404);
        expect(res.body.status).to.deep.equals('error');
        expect(res.body.message).to.deep.equals('this question does not exist');
        done();
      });
  });
  it('should return an authorized response if user has previously posted an answer', (done) => {
    chai.request(app)
      .post('/api/v1/questions/2/answers')
      .send({
        userId: 6,
        answer: 'This is a test answer',
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(403);
        expect(res.body.status).to.deep.equals('error');
        expect(res.body.message).to.deep.equals('you are not allowed to perform this operation');
        done();
      });
  });
  it('should return status code 201 if post is successful', (done) => {
    chai.request(app)
      .post('/api/v1/questions/3/answers')
      .send({
        userId: 6,
        answer: 'This is a test answer',
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(201);
        expect(res.body.status).to.deep.equals('success');
        expect(res.body.message).to.deep.equals('Your answer has been posted');
        expect(res.body).to.have.keys('status', 'newAnswer', 'message');
        done();
      });
  });
});

describe('POST api/v1/questions/:questionId/answers/:answerId', () => {
  it('should return 404 error status if user is not found', (done) => {
    chai.request(app)
      .post('/api/v1/questions/3/answers/8')
      .send({
        userId: 16,
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(404);
        expect(res.body.message).to.deep.equals('this user does not exist');
        done();
      });
  });
  it('should return 404 error status if question is not found', (done) => {
    chai.request(app)
      .post('/api/v1/questions/20/answers/8')
      .send({
        userId: 1,
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(404);
        expect(res.body.message).to.deep.equals('this question does not exist');
        done();
      });
  });
  it('should return 404 error status if answer is not found', (done) => {
    chai.request(app)
      .post('/api/v1/questions/3/answers/30')
      .send({
        userId: 1,
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(404);
        expect(res.body.message).to.deep.equals('this answer does not exist');
        done();
      });
  });
  it('should return an authorized error if user is not the owner of the question', (done) => {
    chai.request(app)
      .post('/api/v1/questions/3/answers/3')
      .send({
        userId: 5,
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(403);
        expect(res.body.message).to.deep.equals('you are not allowed to perform this operation');
        done();
      });
  });
  it('should return an authorized error if question already has an accepted answer', (done) => {
    chai.request(app)
      .post('/api/v1/questions/3/answers/3')
      .send({
        userId: 4,
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(403);
        expect(res.body.message).to.deep.equals('you are not allowed to perform this operation');
        done();
      });
  });
  it('should return a status code 200 if the operation is successful', (done) => {
    chai.request(app)
      .post('/api/v1/questions/1/answers/2')
      .send({
        userId: 6,
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200);
        expect(res.body.message).to.deep.equals('your have accepted this answer');
        expect(res.body).to.have.keys('status', 'message', 'acceptedAnswer');
        done();
      });
  });
});
