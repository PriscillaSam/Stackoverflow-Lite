import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';
import users from '../testData';

chai.use(chaiHttp);
const { expect } = chai;

let userToken;
const apiUrl = '/api/v1/questions/:questionId/answers/:answerId/comments';

before((done) => {
  chai.request(app)
    .post('/api/v1/auth/login')
    .send(users.garry)
    .end((err, res) => {
      if (err) done(err);
      userToken = res.body.token;
      done();
    });
});
describe(`POST ${apiUrl} `, () => {
  it('should return an error if question is not found', (done) => {
    chai.request(app)
      .post(apiUrl.replace(':questionId', '30').replace(':answerId', '3'))
      .set('Authorization', userToken)
      .send({ comment: 'This is a test comment' })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('status').to.be.equals('error');
        expect(res.body).to.have.property('message').to.be
          .equals('this question does not exist');
        done();
      });
  });
  it('should return an error if answer is not found', (done) => {
    chai.request(app)
      .post(apiUrl.replace(':questionId', '3').replace(':answerId', '30'))
      .set('Authorization', userToken)
      .send({ comment: 'This is a test comment' })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('status').to.be.equals('error');
        expect(res.body).to.have.property('message').to.be
          .equals('this answer does not exist');
        done();
      });
  });
  it('should return a success message if post is successful', (done) => {
    chai.request(app)
      .post(apiUrl.replace(':questionId', '1').replace(':answerId', '1'))
      .set('Authorization', userToken)
      .send({ comment: 'This is a test comment' })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(201);
        expect(res.body).to.have.keys('status', 'message', 'new_comment');
        expect(res.body.new_comment).to.be.an('object');
        expect(res.body.new_comment).to.have
          .keys('id', 'user_id', 'comment', 'created_at', 'answer_id');
        done();
      });
  });
});

describe(`GET ${apiUrl} `, () => {
  it('should return an error if question is not found', (done) => {
    chai.request(app)
      .get(apiUrl.replace(':questionId', '30').replace(':answerId', '3'))
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('status').to.be.equals('error');
        expect(res.body).to.have.property('message').to.be
          .equals('this question does not exist');
        done();
      });
  });
  it('should return an error if answer is not found', (done) => {
    chai.request(app)
      .get(apiUrl.replace(':questionId', '3').replace(':answerId', '30'))
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('status').to.be.equals('error');
        expect(res.body).to.have.property('message').to.be
          .equals('this answer does not exist');
        done();
      });
  });
  it('should return a success message if answer has no comments', (done) => {
    chai.request(app)
      .get(apiUrl.replace(':questionId', '1').replace(':answerId', '2'))
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200);
        expect(res.body).to.have.keys('message', 'answer');
        expect(res.body.message).to.be.deep
          .equals('No comments for this answer yet. Be the first to post one.');
        done();
      });
  });

  it('should return a success message if answer has comments', (done) => {
    chai.request(app)
      .get(apiUrl.replace(':questionId', '1').replace(':answerId', '1'))
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200);
        expect(res.body).to.have
          .keys('status', 'message', 'comments', 'answer');
        expect(res.body.comments).to.be.an('array').to.have.lengthOf(1);
        done();
      });
  });
});
