import answerRepo from '../repository/dummy-repo/answer';
import repo from '../repository/dummy-repo/question';
import userRepo from '../repository/dummy-repo/user';
import errors from '../helpers/errorMessages';


class Answer {
  /**
   * Post Answer
   * @param {object} req Request Object
   * @param {object} res Response Object
   */
  static postAnswer(req, res) {
    const questionId = parseInt(req.params.id, 10);
    const { userId, answer } = req.body;
    // check if user (user repo) and question (question repo) exist
    // check if user asked the question sorted
    const user = userRepo.getUser(userId);
    const question = repo.getQuestion(questionId);
    if (!user) {
      return errors.notFound(res, 'user');
    }
    if (!question) {
      return errors.notFound(res, 'question');
    }
    const newAnswer = answerRepo.postAnswer({
      userId,
      questionId,
      answer,
    });

    if (newAnswer === 'not allowed') {
      return errors.unauthorized(res);
    }

    return res.status(201).json({
      status: 'success',
      message: 'Your answer has been posted',
      newAnswer,
    });
  }
}

export default Answer;
