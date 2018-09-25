import pool from '../config/db.config';
import queries from '../helpers/queries';

const { commentQueries } = queries;

/*
 * Comment controller
 */
class Comment {
  /**
   * Handles comment posting operations on the platform
   * @param {object} req Request Object
   * @param {object} res Response Object
   * @returns {object} New comment object
   */
  static postComment(req, res) {
    const { answerId } = req.params;
    const { comment, userId } = req.body;

    pool.connect().then((client) => {
      client.release();
      client.query(commentQueries.postComment(comment, userId, answerId))
        .then((response) => {
          const [newComment] = response.rows;
          return res.status(201).json({
            status: 'success',
            message: 'Your comment has been posted',
            new_comment: newComment,
          });
        });
    });
  }

  /**
 * Get all the comments for an answer
 * @param {object} req Request Object
 * @param {object} res Response Object
 * @returns {object} Object containing an array of comments
 */
  static getComments(req, res) {
    const { answerId } = req.params;
    pool.connect().then((client) => {
      client.query(commentQueries.getComments(answerId))
        .then((response) => {
          const comments = response.rows;
          if (comments.length === 0) {
            return res.status(200).json({
              message:
                'No comments for this answer yet. Be the first to post one.',
            });
          }
          return res.status(200).json({
            status: 'success',
            message: 'Comments retrieved',
            comments,
          });
        });
    });
  }
}
export default Comment;
