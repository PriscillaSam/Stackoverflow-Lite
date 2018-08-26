/* eslint consistent-return: 0 */
import answerRepo from '../repository/dummy-repo/answer';
import repo from '../repository/dummy-repo/question';
import userRepo from '../repository/dummy-repo/user';
import voteRepo from '../repository/dummy-repo/vote';
import errors from '../helpers/errorMessages';
import pool from '../config/db.config';
import queries from '../helpers/queries';

const { questionQueries, answerQueries } = queries;

/**
 * Answer controller
 */
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

    pool.connect()
      .then((client) => {
        client.query(questionQueries.getQuestion(questionId))
          .then((response) => {
            const [questionObj] = response.rows;
            if (!questionObj) {
              return errors.notFound(res, 'question');
            }
            client.query(answerQueries.getAnswersByQId(questionId))
              .then((answerResponse) => {
                const answers = answerResponse.rows;
                if (answers.find(ans => ans.userid === userId)) {
                  return errors.unauthorized(res);
                }
                client.query(answerQueries.postAnswer(userId, questionId, answer))
                  .then((postResponse) => {
                    client.release();
                    const [newAnswer] = postResponse.rows;
                    newAnswer.upvotes = 0;
                    newAnswer.downvotes = 0;

                    return res.status(201).json({
                      status: 'success',
                      message: 'Your answer has been posted',
                      newAnswer,
                    });
                  });
              });
          });
      });
  }

  /**
   * Updates an answer
   * @param {object} req Request
   * @param {object} res Response
   * @returns {object} Updated answer object or error object if answer is not found
   */
  static updateAnswer(req, res) {
    const { questionId, answerId } = req.params;
    const { userId, answer } = req.body;

    pool.connect()
      .then((client) => {
        client.release();
        client.query(questionQueries.getQuestion(questionId))
          .then((response) => {
            const [questionObj] = response.rows;
            if (!questionObj) {
              return errors.notFound(res, 'question');
            }
            client.query(answerQueries.getAnswer(answerId))
              .then((ansResponse) => {
                const [existingAnswer] = ansResponse.rows;
                if (!existingAnswer) {
                  return errors.notFound(res, 'answer');
                }
                if (existingAnswer.questionid !== questionId) {
                  return res.status(404).json({
                    status: 'error',
                    message: 'Bad request. This answer belongs to another question.',
                  });
                }
                if (userId !== existingAnswer.userid && userId !== questionObj.userid) {
                  return errors.unauthorized(res);
                }
                if (existingAnswer.userid === userId) {
                  if (answer) {
                    client.query(answerQueries.updateAnswer(answerId, 'answer', answer))
                      .then((updateRes) => {
                        const [updatedAnswer] = updateRes.rows;
                        return res.status(200).json({
                          status: 'success',
                          message: 'you have updated your answer',
                          updatedAnswer,
                        });
                      });
                  } else if (questionObj.userid !== userId) {
                    return res.status(400).json({
                      status: 'error',
                      message: 'the answer field is required',
                    });
                  }
                }

                if (questionObj.userid === userId && !answer) {
                  client.query(answerQueries.updateAnswer(answerId, 'isaccepted', true))
                    .then((acceptRes) => {
                      const [acceptedAnswer] = acceptRes.rows;
                      return res.status(200).json({
                        status: 'success',
                        message: 'your have accepted this answer',
                        acceptedAnswer,
                      });
                    });
                }
              });
          });
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
