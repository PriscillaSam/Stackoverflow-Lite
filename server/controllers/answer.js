/* eslint consistent-return: 0 */
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
   * @returns {object} Answer object or error object if question or answer does not exist
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
   * @returns {object} Accepted answer object or error object if answer is not found
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
   * @returns {object} Object with status, message and optionally voted answer field for a new vote
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

    if (typeof response === 'string') {
      const responseArray = response.split(' ');
      const responseType = responseArray[1];
      const voteType = responseArray[0];

      if (responseType === 'error') {
        return res.status(400).json({
          status: responseType,
          message: `this answer has been previously ${voteType}d by you`,
        });
      }

      return res.status(200).json({
        status: responseType,
        message: `you have ${voteType}d this answer`,
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

    return res.status(201).json({
      status: 'success',
      message: 'you have upvoted this answer',
      votedAnswer,
    });
  }
}

export default Answer;
