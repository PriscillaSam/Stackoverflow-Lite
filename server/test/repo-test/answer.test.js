import chai from 'chai';
import repo from '../../repository/dummy-repo/answer';
import answers from '../../models/dummy-models/answers';

const { expect } = chai;

describe('Post answer function', () => {
  it('should be a function', () => {
    expect(repo.postAnswer).to.be.a('function');
  });
  it('should return an error not allowed if user has already answered', () => {
    const ansObject = {
      userId: 3,
      questionId: 2,
      answer: 'You bet',
    };
    expect(repo.postAnswer(ansObject)).to.be.a('string');
    expect(repo.postAnswer(ansObject)).to.deep.equals('not allowed');
  });
  it('should increment the answers list', () => {
    const ansObject = {
      userId: 7,
      questionId: 3,
      answer: 'It can be inborn and it can be learned as well',
    };
    const len = answers.length;
    repo.postAnswer(ansObject);
    expect(repo.answers).to.have.length(len + 1);
  });
  it('should return the created answer object', () => {
    const ansObject = {
      userId: 8,
      questionId: 3,
      answer: 'It can be inborn and it can be learned as well',
    };
    const ids = repo.answers.map(a => a.id);
    const answer = {
      id: Math.max(...ids) + 1,
      userId: 8,
      questionId: 3,
      answer: 'It can be inborn and it can be learned as well',
      upvotes: 0,
      downvotes: 0,
      isAccepted: false,
    };
    expect(repo.postAnswer(ansObject)).to.be.deep.equals(answer);
  });
});

describe('Get answer function', () => {
  it('should return null if answer does not exist', () => {
    expect(repo.getAnswer(20)).to.be.deep.equals(null);
  });
  it('should return the answer if answer exists', () => {
    expect(repo.getAnswer(1)).to.deep.equals(answers[0]);
  });
});

describe('Accept answer function', () => {
  it('should return an object', () => {
    const acceptedAnswer = repo.acceptAnswer(12);
    expect(acceptedAnswer).to.be.an('object');
    expect(acceptedAnswer.isAccepted).to.deep.equals(true);
  });
});
