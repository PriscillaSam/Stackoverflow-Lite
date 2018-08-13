import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';

chai.use(chaiHttp);
const { expect } = chai;

describe('function getQuestions of question controller', () => {
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


describe('function getQuestion of question controller', () => {
  it('should return status code 404 if question does not exist', (done) => {
    chai.request(app)
      .get('/api/v1/questions/10')
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
});
