import chai from 'chai';
import app from '../../../app';

const { expect } = chai;


describe('error handler function', () => {
  it('should return status code 400 for bad requests', (done) => {
    chai.request(app)
      .get('/api/v1/questions/o')
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status').to.be.equal('Bad Request');
        expect(res.body.errors.fields).to.be.an('array');
        done();
      });
  });
});
