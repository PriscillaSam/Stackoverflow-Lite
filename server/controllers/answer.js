import answerRepo from '../repository/dummy-repo/answer';
import repo from '../repository/dummy-repo/question';
import userRepo from '../repository/dummy-repo/user';
import voteRepo from '../repository/dummy-repo/vote';
import errors from '../helpers/errorMessages';


class Answer {
  /**
   * Post an Answer
   * @param {object} req Request Object
   * @param {object} res Response Object
   */
  static postAnswer(req, res) {
    const questionId = parseInt(req.params.id, 10);
    const { userId, answer } = req.body;


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

  /**
   * Marks an answer as accepted
   * @param {object} req Request
   * @param {object} res Response
   */
  static acceptAnswer(req, res) {
    const { questionId, answerId } = req.params;
    const { userId } = req.body;

    const user = userRepo.getUser(userId);
    if (!user) {
      return errors.notFound(res, 'user');
    }

    const answer = answerRepo.getAnswer(answerId, questionId);
    if (!answer) {
      return errors.notFound(res, 'answer');
    }

    const question = repo.getQuestion(questionId);
    if (!question) {
      return errors.notFound(res, 'question');
    }

    if (question.user.id !== userId) {
      return errors.unauthorized(res);
    }

    let acceptedAnswer = question.answers.find(ans => ans.isAccepted);
    if (acceptedAnswer) {
      return errors.unauthorized(res);
    }

    acceptedAnswer = answerRepo.acceptAnswer(answerId);
    return res.status(200).json({
      status: 'success',
      message: 'your have accepted this answer',
      acceptedAnswer,
    });
  }

  /**
   * Upvote or Downvote an answer
   * @param {object} req Request Object
   * @param {object} res Response Object
   */
  static voteAnswer(req, res) {
    const answerId = req.params.id;
    const { userId, voteStatus } = req.body;

    const user = userRepo.getUser(userId);
    if (!user) {
      return errors.notFound(res, 'user');
    }

    const answer = answerRepo.getAnswer(answerId);
    if (!answer) {
      return errors.notFound(res, 'answer');
    }

    if (answer.userId === user.id) {
      return res.status(403).json({
        status: 'error',
        message: 'you cannot vote your answer',
      });
    }

    const response = voteRepo.createVote(userId, answerId, voteStatus);
    const votedAnswer = answerRepo.getAnswer(answerId);
    if (response === 'downvote error') {
      return res.status(400).json({
        status: 'error',
        message: 'this answer has been previously downvoted by you',
      });
    }

    if (response === 'upvote error') {
      return res.status(400).json({
        status: 'error',
        message: 'this answer has been previously upvoted by you',
      });
    }

    if (response === 'downvote success') {
      return res.status(200).json({
        status: 'success',
        message: 'you have downvoted this answer',
        votedAnswer,
      });
    }

    if (response === 'upvote success') {
      return res.status(200).json({
        status: 'success',
        message: 'you have upvoted this answer',
        votedAnswer,
      });
    }

    if (response === 0) {
      return res.status(201).json({
        status: 'success',
        message: 'you have downvoted this answer',
        votedAnswer,
      });
    }

    if (response === 1) {
      return res.status(201).json({
        status: 'success',
        message: 'you have upvoted this answer',
        votedAnswer,
      });
    }
  }
}

export default Answer;
