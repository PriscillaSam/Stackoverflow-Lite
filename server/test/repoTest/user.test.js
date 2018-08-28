import chai from 'chai';
import repo from '../../repository/dummyRepo/user';

const { expect } = chai;

describe('get user function', () => {
  it('should return an object', () => {
    const user = repo.getUser(1);
    expect(user).to.be.an('object');
    expect(user).to.have.property('name');
    expect(Object.keys(user)).to.have.length(3);
  });

  it('should return null if user does not exist', () => {
    const user = repo.getUser(21);
    expect(user).to.deep.equals(null);
  });
});
