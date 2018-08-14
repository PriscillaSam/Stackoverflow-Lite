import repo from '../repository/dummy-repo/question';
import userRepo from '../repository/dummy-repo/user';

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
      return res.status(404).json({
        status: 'error',
        message: 'this question does not exist',
      });
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
      res.status(404).json({
        status: 'error',
        message: 'this user does not exist',
      });
    }

    const ques = repo.postQuestion(question, user);
    res.status(200).json({
      status: 'success',
      message: 'Your question has been posted',
      ques,
    });
  }
}

export default Question;
