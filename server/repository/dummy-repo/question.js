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
    const existingQuestion = questions.find(question => question.id === id);
    if (existingQuestion === null || existingQuestion === undefined) return null;

    const questionAnswers = answers.filter(a => a.questionId === id);

    const question = { ...existingQuestion };
    question.answers = questionAnswers;
    return question;
  },

  /**
   * Add a new question to the questions array
   * @param {string} question New question asked
   * @param {object} user Poster User object
   */
  postQuestion(question, user) {
    const ids = questions.map(questn => questn.id);
    const questionObject = {
      id: Math.max(...ids) + 1,
      user,
      question,
    };

    questions.push(questionObject);
    return questionObject;
  },
  /**
   * Deletes a question with the specified id
   * @param {number} questionId id of question to delete
   * @param {number} userId id of user
   * @returns string
   */
  deleteQuestion(questionId, userId) {
    const existingQuestion = questions.find(question => question.id === questionId);
    if (existingQuestion === null || existingQuestion === undefined) return null;
    if (existingQuestion.user.id !== userId) return 'unauthorized';

    const index = questions.indexOf(existingQuestion);
    const removedQuestions = questions.splice(index, 1);
    return removedQuestions[0];
  },
  /**
   * Gets all questions asked by user
   * @param {number} id UserId to get questions for
   */
  getQuestionByUser(id) {
    const userQuestions = this.questions.filter(question => question.user.id === id);
    return [...userQuestions];
  },

};

export default repo;
