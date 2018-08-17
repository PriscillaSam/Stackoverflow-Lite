import chai from 'chai';
import repo from '../../repository/dummy-repo/vote';

const { expect } = chai;

describe('Get votes function', () => {
  const votes = repo.getVotes(6);

  it('should be a function', () => {
    expect(repo.getVotes).to.be.a('function');
  });
  it('should return an object', () => {
    expect(votes).to.be.a('object');
  });
  it('should return downvotes and upvotes', () => {
    expect(votes).to.have.keys('upvotes', 'downvotes');
    expect(votes.upvotes).to.be.equals(2);
    expect(votes.downvotes).to.be.equals(1);
  });
});
