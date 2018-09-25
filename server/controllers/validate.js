import pool from '../config/db.config';
import queries from '../helpers/queries';
import errors from '../helpers/errorMessages';

const { questionQueries, answerQueries } = queries;

/**
 * Validator controller
 */
class Validate {
  /**
   * Checks if an answer exists in the database
   * @param {object} req Request Object
   * @param {object} res Response Object
   * @param {function} next Next function on the middleware chain
   * @returns {object/function} Error object if answer is not found
   * or calls the next middleware function is answer exists
   */
  static checkAnswerExist(req, res, next) {
    const { answerId, id, questionId } = req.params;

    pool.connect().then((client) => {
      client.release();
      client.query(answerQueries.getAnswer(answerId || id))
        .then((response) => {
          const [answer] = response.rows;
          if (!answer) {
            return errors.notFound(res, 'answer');
          }
          if (questionId) {
            if (answer.question_id !== parseInt(questionId, 10)) {
              return res.status(409).json({
                status: 'error',
                message:
                'Bad request. This answer belongs to another question.',
              });
            }
          }
          req.body.existingAnswer = answer;
          next();
        });
    });
  }

  /**
   * Checks if a question exists in the database
   * @param {object} req Request Object
   * @param {object} res Response Object
   * @param {function} next Next function on the middleware chain
   * @returns {object/function} Error object if question is not found
   * or calls the next middleware function is question exists
   */
  static checkQuestionExists(req, res, next) {
    const { questionId, id } = req.params;
    pool.connect().then((client) => {
      client.release();
      client.query(questionQueries.getQuestion(questionId || id))
        .then((response) => {
          const [question] = response.rows;
          if (!question) {
            return errors.notFound(res, 'question');
          }
          req.body.existingQuestion = question;
          next();
        });
    });
  }
}

export default Validate;
