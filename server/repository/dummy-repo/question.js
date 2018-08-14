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

  /**
   * Add a new question to the questions array
   * @param {string} question New question asked
   * @param {object} user Poster User object
   */
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
  /**
   * Deletes a question with the specified id
   * @param {number} questionId id of question to delete
   * @param {number} userId id of user
   * @returns string
   */
  deleteQuestion(questionId, userId) {
    const ques = questions.find(q => q.id === questionId);
    if (ques === null || ques === undefined) return null;
    if (ques.user.id !== userId) return 'unauthorized';

    const index = questions.indexOf(ques);
    const removedQues = questions.splice(index, 1);
    return removedQues[0];
  },

};

export default repo;
