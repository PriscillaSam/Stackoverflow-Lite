import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';

chai.use(chaiHttp);
const { expect } = chai;

describe('GET api/v1/questions', () => {
  it('should return response status 200', (done) => {
    chai.request(app)
      .get('/api/v1/questions')
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200);
        expect(res).to.be.an('object');
        done();
      });
  });
  it('should return an array of questions', (done) => {
    chai.request(app)
      .get('/api/v1/questions')
      .end((err, res) => {
        if (err) done(err);
        expect(res.body).to.haveOwnProperty('questions');
        expect(res.body.questions).to.be.an('array');
        done();
      });
  });
});


describe('GET api/v1/questions/:id', () => {
  it('should return status code 404 if question does not exist', (done) => {
    chai.request(app)
      .get('/api/v1/questions/11')
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(404);
        expect(res.body).to.deep.equals({
          status: 'error',
          message: 'this question does not exist',
        });
        done();
      });
  });

  it('should return status code 200 if question exists', (done) => {
    chai.request(app)
      .get('/api/v1/questions/1')
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('question');
        expect(res.body.status).to.deep.equals('success');
        expect(res.body.question.question).to.deep.equals('Why is programming hard?');
        expect(res.body.message).to.deep.equal('question has been successfully gotten');
        done();
      });
  });

  it('should return a validation error for wrong input', (done) => {
    chai.request(app)
      .get('/api/v1/questions/o')
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('errors');
        expect(res.body.errors).to.have.keys('status', 'statusText', 'errors');
        done();
      });
  });
});

describe('POST api/v1/questions', () => {
  it('should return status code 200', (done) => {
    chai.request(app)
      .post('/api/v1/questions')
      .send(
        {
          userId: 4,
          question: 'Who can tell me?',
        },
      )
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('ques');
        expect(res.body.status).to.deep.equals('success');
        done();
      });
  });

  it('should return an error if user does not exist', (done) => {
    chai.request(app)
      .post('/api/v1/questions')
      .send({ userId: 34, question: 'Who can tell me?' })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(404);
        expect(res.body.status).to.deep.equals('error');
        expect(res.body.message).to.deep.equals('this user does not exist');
        done();
      });
  });
});

describe('DELETE api/v1/question/:id', () => {
  it('should return status 404 if user does not exist', (done) => {
    chai.request(app)
      .del('/api/v1/questions/1')
      .send({ userId: 34 })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(404);
        expect(res.body).to.have.keys('status', 'message');
        expect(res.body.message).to.deep.equals('this user does not exist');
        done();
      });
  });

  it('should return status 403 if unauthorized', (done) => {
    chai.request(app)
      .del('/api/v1/questions/4')
      .send({ userId: 4 })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(403);
        expect(res.body.status).to.deep.equals('error');
        expect(res.body.message).to.deep.equals('you are not allowed to perform this operation');
        done();
      });
  });

  it('should return status 404 if question does not exist', (done) => {
    chai.request(app)
      .del('/api/v1/questions/20')
      .send({ userId: 4 })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(404);
        expect(res.body.status).to.deep.equals('error');
        expect(res.body.message).to.deep.equals('this question does not exist');
        done();
      });
  });

  it('should return the deleted question', (done) => {
    chai.request(app)
      .del('/api/v1/questions/6')
      .send({ userId: 2 })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200);
        expect(res.body.status).to.deep.equals('success');
        expect(res.body.message).to.deep.equals('your question has been deleted');
        expect(res.body).to.have.property('question');
        done();
      });
  });
  it('should return a validation error for wrong input', (done) => {
    chai.request(app)
      .del('/api/v1/questions/o')
      .send({ userId: 2 })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('errors');
        done();
      });
  });
});
