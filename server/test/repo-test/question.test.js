import chai from 'chai';
import repo from '../../repository/dummy-repo/question';
import questions from '../../models/dummy-models/questions';

const { expect } = chai;

describe('Get questions fuction', () => {
  it('should be a function', () => {
    expect(repo.getQuestions).to.be.a('function');
  });
  it('should have 4 questions in it', () => {
    expect(repo.getQuestions()).to.have.length(4);
  });
  it('should contain an array of objects', () => {
    expect(repo.getQuestions()).to.be.a('array');
  });
  it('should return actual question objects', () => {
    expect(repo.getQuestions()).to.deep.equals(questions);
  });
  it('should contain user objects', () => {
    repo.getQuestions()
      .forEach(q => expect(q).to.have.property('user'));
  });
});
