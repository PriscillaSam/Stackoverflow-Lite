import repo from '../repository/dummy-repo/question';
import userRepo from '../repository/dummy-repo/user';
import errors from '../helpers/errorMessages';
import pool from '../config/db.config';
import queries from '../helpers/queries';

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
        client.query(queries.questionQueries.getQuestions())
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

    const question = repo.getQuestion(questionId);
    if (question === null) {
      return errors.notFound(res, 'question');
    }

    return res.status(200).json({
      status: 'success',
      message: 'question has been successfully gotten',
      question,
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
    const user = userRepo.getUser(userId);

    if (user === null) {
      return errors.notFound(res, 'user');
    }

    const postedQuestion = repo.postQuestion(question, user);
    return res.status(201).json({
      status: 'success',
      message: 'Your question has been posted',
      postedQuestion,
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

    const user = userRepo.getUser(userId);
    if (user === null) {
      return errors.notFound(res, 'user');
    }
    const question = repo.deleteQuestion(questionId, userId);

    if (question === 'unauthorized') {
      return errors.unauthorized(res);
    }
    if (!question) {
      return errors.notFound(res, 'question');
    }

    return res.status(200).json({
      status: 'success',
      message: 'your question has been deleted',
      question,
    });
  }
}

export default Question;
