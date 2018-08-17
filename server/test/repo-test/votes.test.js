import chai from 'chai';
import repo from '../../repository/dummy-repo/vote';
import votes from '../../models/dummy-models/votes';

const { expect } = chai;

describe('Get votes function', () => {
  const answerVotes = repo.getVotes(6);

  it('should be a function', () => {
    expect(repo.getVotes).to.be.a('function');
  });
  it('should return an object', () => {
    expect(answerVotes).to.be.a('object');
  });
  it('should return downvotes and upvotes', () => {
    expect(answerVotes).to.have.keys('upvotes', 'downvotes');
    expect(answerVotes.upvotes).to.be.equals(2);
    expect(answerVotes.downvotes).to.be.equals(1);
  });
});

describe('Create vote function', () => {
  it('should be a function', () => {
    expect(repo.createVote).to.be.a('function');
  });
  it('should return downvote error if user already downvoted before', () => {
    expect(repo.createVote(9, 9, 0)).to.be.deep.equals('downvote error');
  });
  it('should return upvote error if user already upvote before', () => {
    expect(repo.createVote(8, 9, 1)).to.be.deep.equals('upvote error');
  });
  it('should return upvote success if user downvoted before', () => {
    expect(repo.createVote(2, 6, 1)).to.be.deep.equals('upvote success');
  });
  it('should return downvote success if user upvoted before', () => {
    expect(repo.createVote(3, 6, 0)).to.be.deep.equals('downvote success');
  });
  it('should return vote status if voting is successful', () => {
    const len = votes.length;
    expect(repo.createVote(3, 18, 1)).to.be.deep.equals(1);
    expect(votes.length).to.deep.equals(len + 1);
  });
  it('should return 0 for unknown values', () => {
    expect(repo.createVote(3, 6, 9)).to.be.deep.equals(0);
  });
});
