import errors from '../helpers/errorMessages';
import pool from '../config/db.config';
import queries from '../helpers/queries';

const { answerQueries, questionQueries } = queries;

/**
 * Question controller
 */
class Question {
  /**
   * Fetches all the questions available
   * @param {object} req Request object
   * @param {object} res Response object
   * @returns {object} List of questions
   */
  static getQuestions(req, res) {
    pool.connect()
      .then((client) => {
        client.query(questionQueries.getQuestions())
          .then((response) => {
            client.release();
            res.status(200).json({
              status: 'success',
              message: 'questions successfully gotten',
              questions: response.rows,
            });
          });
      });
  }

  /**
   * Fetches a particular question by id
   * @param {object} req Request Object containing question id
   * @param {object} res Response object
   * @returns {object} Question object or error object if question is not found
   */
  static getQuestion(req, res) {
    const questionId = parseInt(req.params.id, 10);

    pool.connect()
      .then((client) => {
        client.query(questionQueries.getQuestion(questionId))
          .then((response) => {
            client.release();
            const [questionObj] = response.rows;
            if (!questionObj) {
              return errors.notFound(res, 'question');
            }
            client.query(answerQueries.getQuestionAnswers(questionId))
              .then((answerResponse) => {
                const answers = answerResponse.rows;
                questionObj.answers = answers;
                res.status(200).json({
                  status: 'success',
                  message: 'question has been successfully gotten',
                  questionObj,
                });
              });
          });
      });
  }

  /**
   * Posts a question on the platform
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @returns {object} Posted question or error object if user is not found
   */
  static postQuestion(req, res) {
    const { userId, question } = req.body;

    pool.connect()
      .then((client) => {
        client.query(questionQueries.postQuestion(question, userId))
          .then((response) => {
            client.release();
            const [postedQuestion] = response.rows;
            return res.status(201).json({
              status: 'success',
              message: 'Your question has been posted',
              newQuestion: postedQuestion,
            });
          });
      });
  }

  /**
   * Delete's a question with the passed id
   * @param {object} req Request Object
   * @param {object} res Response Object
   * @returns {object} Deleted question or error object if question is not found
   */
  static deleteQuestion(req, res) {
    const questionId = parseInt(req.params.id, 10);
    const { userId } = req.body;

    pool.connect()
      .then((client) => {
        client.query(questionQueries.getQuestion(questionId))
          .then((response) => {
            const [questionObj] = response.rows;
            if (!questionObj) {
              return errors.notFound(res, 'question');
            }
            if (userId !== questionObj.userid) {
              return errors.unauthorized(res);
            }
            client.query(questionQueries.deleteQuestion(questionId))
              .then((deleted) => {
                client.release();
                const [question] = deleted.rows;
                return res.status(200).json({
                  status: 'success',
                  message: 'your question has been deleted',
                  deletedQuestion: question.question,
                });
              });
          });
      });
  }

  /**
   * Get all questions asked by user
   * @param {object} req Request object
   * @param {object} res Response object
   * @returns {object} Array of user questions
   */
  static getUserQuestions(req, res) {
    const { userId } = req.body;

    pool.connect()
      .then((client) => {
        client.release();
        client.query(questionQueries.getUserQuestions(userId))
          .then((response) => {
            const questions = response.rows;
            return res.status(200).json({
              status: 'success',
              message: 'your questions have been retrieved successfully',
              questions,
            });
          });
      });
  }
}

export default Question;
