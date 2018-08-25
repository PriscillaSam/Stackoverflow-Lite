/* eslint max-len: 0 */

import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';

chai.use(chaiHttp);
const { expect } = chai;
const badToken = 'FpbC5jb20iLCJpYXQiOjE1MzUxODE2MjUsImV4cCI6MTUzNTI2ODAyNX0.hmQeQFBbUkfggfUtYlJPGq3_x8Ru-XjOEb5LVhhh4PY';


describe('Auth manager', () => {
  it('should return status code 401 if token is invalid', (done) => {
    chai.request(app)
      .post('/api/v1/questions')
      .set('Authorization', badToken)
      .send(
        {
          userId: 4,
          question: 'Who can tell me?',
        },
      )
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(401);
        expect(res.body.message).to.deep.equals('failed to authenticate token');
        expect(res.body.status).to.deep.equals('error');
        done();
      });
  });
  it('should return error if token is not provided', (done) => {
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
        expect(res).to.have.status(401);
        expect(res.body.message).to.deep.equals('User not authenticated. No token provided.');
        expect(res.body.status).to.deep.equals('error');
        done();
      });
  });
});
