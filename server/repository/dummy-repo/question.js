import questions from '../../models/dummy-models/questions';
import answers from '../../models/dummy-models/answers';

const repo = {
  questions,

  /**
   * @function getQuestions Gets all questions on the platform
   */
  getQuestions() {
    return questions;
  },

  /**
   * @function getQuestion Gets a particular question and it's answers
   * @param {Int} id Question Id
   */
  getQuestion(id) {
    const question = questions.find(q => q.id === id);
    if (question === null || question === undefined) return null;

    const questionAnswers = answers.filter(a => a.questionId === id);

    const ques = { ...question };
    ques.answers = questionAnswers;
    return ques;
  },

  postQuestion(question, user) {
    const ids = questions.map(q => q.id);
    const quesObject = {
      id: Math.max(...ids) + 1,
      user,
      question,
    };

    questions.push(quesObject);
    return quesObject;
  },
};

export default repo;
