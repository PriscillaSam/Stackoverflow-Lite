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
