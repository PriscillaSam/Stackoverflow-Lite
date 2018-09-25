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
}
export default Comment;
