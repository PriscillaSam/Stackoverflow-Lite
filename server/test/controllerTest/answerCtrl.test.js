import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';
import users from '../testData';

chai.use(chaiHttp);
const { expect } = chai;
let userToken;
let askerToken;

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
describe('POST api/v1/questions/:questionId/answers', () => {
  it('should return status 404 if question does not exist', (done) => {
    chai.request(app)
      .post('/api/v1/questions/20/answers')
      .set('Authorization', userToken)
      .send({
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
  it(`should return an authorized response
    if user has previously posted an answer`, (done) => {
    chai.request(app)
      .post('/api/v1/questions/2/answers')
      .set('Authorization', userToken)
      .send({
        answer: 'This is a test answer',
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(403);
        expect(res.body.status).to.deep.equals('error');
        expect(res.body.message)
          .to.deep.equals('you are not allowed to perform this operation');
        done();
      });
  });
  it('should return status code 201 if post is successful', (done) => {
    chai.request(app)
      .post('/api/v1/questions/3/answers')
      .set('Authorization', userToken)
      .send({
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

describe('PUT api/v1/questions/:questionId/answers/:answerId', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(users.priscilla)
      .end((err, res) => {
        if (err) done(err);
        askerToken = res.body.token;
        done();
      });
  });

  it('should return 404 error status if question is not found', (done) => {
    chai.request(app)
      .put('/api/v1/questions/20/answers/8')
      .set('Authorization', userToken)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(404);
        expect(res.body.message).to.deep.equals('this question does not exist');
        done();
      });
  });

  it('should return 404 error status if answer is not found', (done) => {
    chai.request(app)
      .put('/api/v1/questions/3/answers/30')
      .set('Authorization', userToken)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(404);
        expect(res.body.message).to.deep.equals('this answer does not exist');
        done();
      });
  });

  it(`should return an unauthorized error 
    if user is not the owner of the question or the answer`, (done) => {
    chai.request(app)
      .put('/api/v1/questions/3/answers/8')
      .set('Authorization', userToken)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(403);
        expect(res.body.message).to.deep
          .equals('you are not allowed to perform this operation');
        done();
      });
  });

  it(`should return a status code 404
    if the answer is not for the question`, (done) => {
    chai.request(app)
      .put('/api/v1/questions/5/answers/23')
      .set('Authorization', userToken)
      .send({
        answer: 'updated answer',
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(404);
        expect(res.body.message).to.deep
          .equals('Bad request. This answer belongs to another question.');
        expect(res.body).to.have.keys('status', 'message');
        done();
      });
  });

  it('should update answer if user provides an answer', (done) => {
    chai.request(app)
      .put('/api/v1/questions/5/answers/25')
      .set('Authorization', userToken)
      .send({
        answer: 'updated answer',
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200);
        expect(res.body.message).to.deep.equals('you have updated your answer');
        expect(res.body).to.have.keys('status', 'message', 'updatedAnswer');
        done();
      });
  });

  it(`should accept answer if user owns the question 
    and owns the answer without providing an answer field`, (done) => {
    chai.request(app)
      .put('/api/v1/questions/5/answers/25')
      .set('Authorization', userToken)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200);
        expect(res.body.message).to.deep
          .equals('your have accepted this answer');

        expect(res.body).to.have.keys('status', 'message', 'acceptedAnswer');
        done();
      });
  });

  it('should return an error if user does not provide an answer', (done) => {
    chai.request(app)
      .put('/api/v1/questions/5/answers/24')
      .set('Authorization', askerToken)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(400);
        expect(res.body).to.have.keys('status', 'message');
        expect(res.body.status).to.deep.equals('error');
        expect(res.body.message).to.deep.equals('the answer field is required');
        done();
      });
  });

  it('should update answer if user provides answer', (done) => {
    chai.request(app)
      .put('/api/v1/questions/5/answers/24')
      .set('Authorization', askerToken)
      .send({
        answer: 'updated answer',
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200);
        expect(res.body.message).to.deep.equals('you have updated your answer');
        expect(res.body).to.have.keys('status', 'message', 'updatedAnswer');
        done();
      });
  });
});

describe('POST api/v1/answers/:answerId (Vote answer)', () => {
  it('should return 400 error if status is not supplied', (done) => {
    chai.request(app)
      .post('/api/v1/answers/1')
      .send({
        userId: 2,
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(400);
        expect(res).to.be.an('object');
        expect(res.body.status).to.deep.equals('error');
        expect(res.body.message).to.deep.equals('voteStatus field is required');
        done();
      });
  });
  it('should return 400 error if status is not 0 0r 1', (done) => {
    chai.request(app)
      .post('/api/v1/answers/1')
      .send({
        userId: 2,
        voteStatus: 3,
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(400);
        expect(res).to.be.an('object');
        expect(res.body.status).to.deep.equals('error');
        expect(res.body.message).to.deep
          .equals('voteStatus field can only be 0 or 1');
        done();
      });
  });
  it('should return 404 error status if user is not found', (done) => {
    chai.request(app)
      .post('/api/v1/answers/1')
      .send({
        userId: 16,
        voteStatus: 1,
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(404);
        expect(res.body.status).to.deep.equals('error');
        expect(res.body.message).to.deep.equals('this user does not exist');
        done();
      });
  });
  it('should return 404 error status if answer is not found', (done) => {
    chai.request(app)
      .post('/api/v1/answers/30')
      .send({
        userId: 1,
        voteStatus: 1,
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(404);
        expect(res.body.status).to.deep.equals('error');
        expect(res.body.message).to.deep.equals('this answer does not exist');
        done();
      });
  });
  it('should return 404 error status if answer is not found', (done) => {
    chai.request(app)
      .post('/api/v1/answers/19')
      .send({
        userId: 3,
        voteStatus: 1,
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(403);
        expect(res.body.status).to.deep.equals('error');
        expect(res.body.message).to.deep.equals('you cannot vote your answer');
        done();
      });
  });
  it('should return 400 error if user has upvoted before', (done) => {
    chai.request(app)
      .post('/api/v1/answers/8')
      .send({
        userId: 2,
        voteStatus: 1,
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(400);
        expect(res).to.be.an('object');
        expect(res.body.status).to.be.deep.equals('error');
        expect(res.body.message).to.be.deep
          .equals('this answer has been previously upvoted by you');
        done();
      });
  });
  it('should return 400 error if user has downvoted before', (done) => {
    chai.request(app)
      .post('/api/v1/answers/8')
      .send({
        userId: 1,
        voteStatus: 0,
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(400);
        expect(res).to.be.an('object');
        expect(res.body.status).to.be.deep.equals('error');
        expect(res.body.message).to.be.deep
          .equals('this answer has been previously downvoted by you');
        done();
      });
  });
  it('should return a status 200 if upvote is successful', (done) => {
    chai.request(app)
      .post('/api/v1/answers/8')
      .send({
        userId: 9,
        voteStatus: 1,
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('status', 'message', 'votedAnswer');
        expect(res.body.message).to.deep.equals('you have upvoted this answer');
        done();
      });
  });
  it('should return a status 200 if downvote is successful', (done) => {
    chai.request(app)
      .post('/api/v1/answers/8')
      .send({
        userId: 8,
        voteStatus: 0,
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('status', 'message', 'votedAnswer');
        expect(res.body.message).to.deep
          .equals('you have downvoted this answer');
        done();
      });
  });
  it('should return a status 201 if new upvote is successful', (done) => {
    chai.request(app)
      .post('/api/v1/answers/17')
      .send({
        userId: 5,
        voteStatus: 1,
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(201);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('status', 'message', 'votedAnswer');
        expect(res.body.message).to.deep.equals('you have upvoted this answer');
        done();
      });
  });
  it('should return a status 201 if new downvote is successful', (done) => {
    chai.request(app)
      .post('/api/v1/answers/16')
      .send({
        userId: 5,
        voteStatus: 0,
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(201);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('status', 'message', 'votedAnswer');
        expect(res.body.message).to.deep
          .equals('you have downvoted this answer');
        done();
      });
  });
});
