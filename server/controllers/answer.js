import errors from '../helpers/errorMessages';
import pool from '../config/db.config';
import queries from '../helpers/queries';

const { questionQueries, answerQueries, voteQueries } = queries;

/**
 * Answer controller
 */
class Answer {
  /**
   * Post an Answer
   * @param {object} req Request Object
   * @param {object} res Response Object
   * @returns {object} Answer object
   * or error object if question or answer does not exist
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
            client.query(answerQueries
              .postAnswer(userId, questionId, answer))
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
  }

  /**
   * Updates an answer
   * @param {object} req Request
   * @param {object} res Response
   * @returns {object} Updated answer object
   * or error object if answer is not found
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
                  return res.status(409).json({
                    status: 'error',
                    message:
                    'Bad request. This answer belongs to another question.',
                  });
                }
                if (userId !== existingAnswer.userid
                  && userId !== questionObj.userid) {
                  return errors.unauthorized(res);
                }
                if (existingAnswer.userid === userId) {
                  if (answer) {
                    client.query(answerQueries
                      .updateAnswer(answerId, 'answer', answer))
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
                  client.query(answerQueries.checkAccepted(questionId))
                    .then((prevAccepted) => {
                      let acceptedId;
                      const [accepted] = prevAccepted.rows;
                      if (accepted) {
                        client.query(answerQueries
                          .updateAnswer(accepted.id, 'isaccepted', false));
                        acceptedId = accepted.id;
                      }
                      client.query(answerQueries
                        .updateAnswer(answerId, 'isaccepted', true))
                        .then((acceptRes) => {
                          const [acceptedAnswer] = acceptRes.rows;
                          acceptedAnswer.prevAccepted = acceptedId || '';
                          return res.status(200).json({
                            status: 'success',
                            message: 'your have accepted this answer',
                            acceptedAnswer,
                          });
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
   * @returns {object} Object with status,
   * message and the voted answer object
   */
  static voteAnswer(req, res) {
    const answerId = req.params.id;
    const { userId, vote } = req.body;

    pool.connect()
      .then((client) => {
        client.release();
        client.query(answerQueries.getAnswer(answerId))
          .then((response) => {
            const [answer] = response.rows;
            if (!answer) {
              return errors.notFound(res, 'answer');
            }
            if (answer.userid === userId) {
              return res.status(403).json({
                status: 'error',
                message: 'you cannot vote your answer',
              });
            }
            client.query(voteQueries.getUserVote(answerId, userId))
              .then((voteResponse) => {
                const [previousVote] = voteResponse.rows;
                if (previousVote) {
                  if (previousVote.vote === vote) {
                    if (vote === 0) {
                      return res.status(400).json({
                        status: 'error',
                        message:
                        'this answer has been previously downvoted by you',
                      });
                    }
                    return res.status(400).json({
                      status: 'error',
                      message:
                      'this answer has been previously upvoted by you',
                    });
                  }
                  client
                    .query(voteQueries.updateVote(previousVote.id, vote))
                    .then((voteRes) => {
                      const [updatedVote] = voteRes.rows;
                      client.query(voteQueries.getAnswerVotes(answerId))
                        .then((voteRespons) => {
                          const votes = voteRespons.rows;
                          answer.upvotes = votes
                            .filter(v => v.vote === 1).length;
                          answer.downvotes = votes
                            .filter(v => v.vote === 0).length;

                          if (updatedVote.vote === 0) {
                            return res.status(200).json({
                              status: 'success',
                              message:
                              'you have downvoted this answer',
                              answer,
                            });
                          }
                          return res.status(200).json({
                            status: 'success',
                            message:
                            'you have upvoted this answer',
                            answer,
                          });
                        });
                    });
                } else {
                  const values = [answerId, userId, vote];
                  client.query(voteQueries.voteAnswer(values))
                    .then((newVoteRes) => {
                      const [newvote] = newVoteRes.rows;
                      client.query(voteQueries.getAnswerVotes(answerId))
                        .then((voteRespons) => {
                          const votes = voteRespons.rows;
                          answer.upvotes = votes
                            .filter(v => v.vote === 1).length;
                          answer.downvotes = votes
                            .filter(v => v.vote === 0).length;

                          if (newvote.vote === 0) {
                            return res.status(201).json({
                              status: 'success',
                              message: 'you have downvoted this answer',
                              answer,
                            });
                          }
                          return res.status(201).json({
                            status: 'success',
                            message: 'you have upvoted this answer',
                            answer,
                          });
                        });
                    });
                }
              });
          });
      });
  }
}

export default Answer;
