import chai from 'chai';
import repo from '../../repository/dummy-repo/question';
import questions from '../../models/dummy-models/questions';
import answers from '../../models/dummy-models/answers';

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

describe('Get question function', () => {
  it('should be a function', () => {
    expect(repo.getQuestion).to.be.a('function');
  });

  it('should return a question object', () => {
    const question = repo.getQuestion(1);

    expect(question).to.have.property('answers');
    expect(question).to.be.an('object');
    expect(question).to.have.property('user');
  });

  it('question with id 2 should have 3 answers', () => {
    const question = repo.getQuestion(2);
    const questionAnswers = answers.filter(a => a.questionId === 2);

    expect(question.answers).to.be.an('array');
    expect(question.answers).to.have.lengthOf(3);
    expect(question.answers).to.deep.equals(questionAnswers);
  });

  it('should return null if question does not exist', () => {
    const question = repo.getQuestion(10);
    expect(question).to.be.deep.equals(null);
  });
});
