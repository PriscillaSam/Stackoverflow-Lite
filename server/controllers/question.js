import repo from '../repository/dummy-repo/question';
import userRepo from '../repository/dummy-repo/user';
import errors from '../helpers/errorMessages';

class Question {
  /**
   * @method getQuestions Fetches all the questions available
   * @param {object} req Request object
   * @param {object} res Response object List of questions
   */
  static getQuestions(req, res) {
    res.status(200).json({
      status: 'success',
      message: 'questions successfully gotten',
      questions: repo.getQuestions(),
    });
  }

  /**
   * @method getQuestion Fetches a particular question by id
   * @param {object} req Request Object containing question id
   * @param {object} res Response object containing question
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
   * @method postQuestion Post a question on the platform
   * @param {object} req Request object
   * @param {object} res Response object
   */
  static postQuestion(req, res) {
    const { userId, question } = req.body;
    const user = userRepo.getUser(userId);

    if (user === null) {
      return errors.notFound(res, 'user');
    }

    const ques = repo.postQuestion(question, user);
    return res.status(201).json({
      status: 'success',
      message: 'Your question has been posted',
      ques,
    });
  }

  /**
   * Delete's a question with the passed id
   * @param {object} req Request Object
   * @param {object} res Response Object
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
