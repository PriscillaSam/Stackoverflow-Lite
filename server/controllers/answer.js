import errors from '../helpers/errorMessages';
import pool from '../config/db.config';
import queries from '../helpers/queries';

const { answerQueries, voteQueries } = queries;

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
    const questionId = parseInt(req.params.questionId, 10);
    const { userId, answer } = req.body;

    pool.connect().then((client) => {
      client.query(answerQueries
        .postAnswer(userId, questionId, answer))
        .then((postResponse) => {
          client.release();
          const [newAnswer] = postResponse.rows;
          newAnswer.upvotes = 0;
          newAnswer.downvotes = 0;
          newAnswer.comments = 0;

          return res.status(201).json({
            status: 'success',
            message: 'Your answer has been posted',
            new_answer: newAnswer,
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
    const { existingAnswer, existingQuestion } = req.body;
    const { questionId, answerId } = req.params;
    const { userId, answer } = req.body;

    pool.connect().then((client) => {
      client.release();
      if (userId !== existingAnswer.user_id
        && userId !== existingQuestion.user_id) {
        return errors.unauthorized(res);
      }
      if (existingAnswer.user_id === userId) {
        if (answer) {
          client.query(answerQueries
            .updateAnswer(answerId, 'answer', answer))
            .then((updateRes) => {
              const [updatedAnswer] = updateRes.rows;
              return res.status(200).json({
                status: 'success',
                message: 'you have updated your answer',
                updated_answer: updatedAnswer,
              });
            });
        } else if (existingQuestion.user_id !== userId) {
          return res.status(400).json({
            status: 'error',
            message: 'the answer field is required',
          });
        }
      }

      if (existingQuestion.user_id === userId && !answer) {
        client.query(answerQueries.checkAccepted(questionId))
          .then((prevAccepted) => {
            let acceptedId;
            const [accepted] = prevAccepted.rows;
            if (accepted) {
              client.query(answerQueries
                .updateAnswer(accepted.id, 'is_accepted', false));
              acceptedId = accepted.id;
            }
            client.query(answerQueries
              .updateAnswer(answerId, 'is_accepted', true))
              .then((acceptRes) => {
                const [acceptedAnswer] = acceptRes.rows;
                acceptedAnswer.prevAccepted = acceptedId || '';
                return res.status(200).json({
                  status: 'success',
                  message: 'your have accepted this answer',
                  accepted_answer: acceptedAnswer,
                });
              });
          });
      }
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
    const { userId, vote, existingAnswer } = req.body;

    pool.connect().then((client) => {
      client.release();
      if (existingAnswer.user_id === userId) {
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
                    existingAnswer.upvotes = votes
                      .filter(v => v.vote === 1).length;
                    existingAnswer.downvotes = votes
                      .filter(v => v.vote === 0).length;

                    if (updatedVote.vote === 0) {
                      return res.status(200).json({
                        status: 'success',
                        message:
                              'you have downvoted this answer',
                        answer: existingAnswer,
                      });
                    }
                    return res.status(200).json({
                      status: 'success',
                      message:
                            'you have upvoted this answer',
                      answer: existingAnswer,
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
                    existingAnswer.upvotes = votes
                      .filter(v => v.vote === 1).length;
                    existingAnswer.downvotes = votes
                      .filter(v => v.vote === 0).length;

                    if (newvote.vote === 0) {
                      return res.status(201).json({
                        status: 'success',
                        message: 'you have downvoted this answer',
                        answer: existingAnswer,
                      });
                    }
                    return res.status(201).json({
                      status: 'success',
                      message: 'you have upvoted this answer',
                      answer: existingAnswer,
                    });
                  });
              });
          }
        });
    });
  }
}

export default Answer;
