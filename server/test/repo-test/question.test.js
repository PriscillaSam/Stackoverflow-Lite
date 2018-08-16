/* eslint prefer-destructuring: 0 */
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
    expect(repo.getQuestions()).to.have.length(questions.length);
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
    const question = repo.getQuestion(13);
    expect(question).to.be.deep.equals(null);
  });
});

describe('Post question function', () => {
  it('should add a question to the question array', () => {
    const question = 'What is your name?';
    const length = questions.length;
    const user = { id: 4, name: 'Joe Sam' };

    const returnObject = repo.postQuestion(question, user);
    expect(repo.questions).to.have.lengthOf(length + 1);
    expect(returnObject).to.be.an('object');
  });
});

describe('Delete question function', () => {
  it('should be a function', () => {
    expect(repo.deleteQuestion).to.be.a('function');
  });
  it('should return null if question does not exist', () => {
    expect(repo.deleteQuestion(13, 4)).to.deep.equals(null);
  });
  it('should return the removed question', () => {
    const question = questions.find(q => q.id === 3);
    const delQuestion = repo.deleteQuestion(3, 4);

    expect(delQuestion).to.be.a('object');
    expect(delQuestion).to.deep.equal(question);
    expect(delQuestion).to.have.property('user');
    expect(delQuestion.user.id).to.deep.equal(4);
  });
  it('should return unauthorized if question is not user\'s ', () => {
    expect(repo.deleteQuestion(4, 4)).to.deep.equals('unauthorized');
    expect(repo.deleteQuestion(4, 4)).to.be.a('string');
  });
});

describe('Get questions by user function', () => {
  it('should be a function', () => {
    expect(repo.getQuestionByUser).to.be.a('function');
  });
  it('should return an array', () => {
    expect(repo.getQuestionByUser(1)).to.be.an('array');
  });
  it('should return an empty array if user doesnt have questions', () => {
    expect(repo.getQuestionByUser(1)).to.deep.equals([]);
  });
  it('should return an array of the user\'s questions', () => {
    const len = repo.questions.filter(q => q.user.id === 3).length;
    expect(repo.getQuestionByUser(3)).to.have.length(len);
  });
});
