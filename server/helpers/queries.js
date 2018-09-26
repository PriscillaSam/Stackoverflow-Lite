const userQueries = {
  /**
   * Create user query function
   * @param {string} name user name
   * @param {string} email user email
   * @param {string} passHash hashed password
   * @returns {object} Create user query object
   */
  createUser(name, email, passHash) {
    return {
      text: `INSERT into users(name, email, password_hash) 
      VALUES($1, $2, $3) RETURNING id, name, email`,
      values: [name, email, passHash],
    };
  },
  /**
   * Get user query function
   * @param {string} email user email
   * @returns {object} Get user query object
   */
  getUser(email) {
    return {
      text: 'SELECT id, name, email, password_hash FROM users WHERE email = $1',
      values: [email],
    };
  },
  /**
   * Get user profile query method
   * @param {number} userId Id of user
   * @returns {object} Get user profile query object
   */
  getUserProfile(userId) {
    return {
      text: `
        SELECT
          id as user_id,
          COALESCE((SELECT COUNT (a.id) FROM answers a 
          WHERE a.user_id = $1 GROUP BY a.user_id),0) as answers

          FROM users
          WHERE id = $1 
      `,
      values: [userId],
    };
  },
};
const questionQueries = {
  /**
   * Get questions query method
   * @returns {string} Get questions query
   */
  getQuestions() {
    const query = `
    SELECT 
     q.id,
     question, 
     q.created_at, 
     u.id as user_id,
     name,
     COALESCE((SELECT COUNT (a.id) FROM answers a 
     WHERE a.question_id = q.id GROUP BY q.id),0) as answers

    FROM questions q 
    JOIN users u ON u.id = q.user_id
    ORDER BY created_at DESC

    `;
    return query;
  },
  /**
   * Get question query function
   * @param {number} id Question id
   * @returns {string} Get question query
   */
  getQuestion(id) {
    return {
      text: `
    SELECT
      q.id,
      question,
      q.created_at,
      u.id as user_id,
      name
    FROM questions q
    JOIN users u ON u.id = q.user_id
    WHERE q.id = $1
    ;
    `,
      values: [id],
    };
  },
  /**
   * Get user's questions query function
   * @param {number} id User id
   * @returns {object} User's questions
   */
  getUserQuestions(id) {
    return {
      text: `
      SELECT id,
      question,
      created_at,
      COALESCE((SELECT COUNT (a.id) FROM answers a 
      WHERE a.question_id = q.id GROUP BY q.id),0) as answers
      FROM questions q
      WHERE user_id = $1
      ORDER BY answers DESC
      `,
      values: [id],
    };
  },
  /**
   * Post question query function
   * @param {string} question Asked question
   * @param {number} userId User id
   * @returns {object} Post question query object
   */
  postQuestion(question, userId) {
    return {
      text: `INSERT INTO questions(question, user_id) 
      VALUES($1, $2) RETURNING id, question, created_at`,
      values: [question, userId],
    };
  },
  /**
   * Update question query function
   * @param {number} id Question id
   * @returns {object} Update question query object
   */
  updateQuestion(id) {
    return {
      text: `
      UPDATE questions q1
      SET question_tokens = to_tsvector(q1.question)
      WHERE q1.id = $1`,
      values: [id],
    };
  },
  /**
   * Delete question query function
   * @param {number} id Question id
   * @returns {object} Delete Question query object
   */
  deleteQuestion(id) {
    return {
      text: 'DELETE FROM questions WHERE id = $1 RETURNING question;',
      values: [id],
    };
  },
  /**
   * Search question query function
   * @param {string} searchString Search string
   * @returns {object} Search question query object
   */
  searchQuestions(searchString) {
    return {
      text: `
      SELECT q.id,
      question, 
      q.created_at, 
      u.id as user_id,
      name,
      COALESCE((SELECT COUNT (a.id) FROM answers a 
      WHERE a.question_id = q.id GROUP BY q.id),0) as answers

      FROM questions q
      JOIN users u ON u.id = q.user_id
      WHERE question_tokens @@ to_tsquery($1)`,
      values: [searchString],
    };
  },
};

const answerQueries = {
  /**
   * Get a question's answers query function
   * @param {number} id Question id
   * @returns {object} Get answers query object
   */
  getQuestionAnswers(id) {
    return {
      text: `
        SELECT 
        a.id, 
        answer,
        u.id as user_id,
        u.name,
        u.email,
        COALESCE((SELECT COUNT (v.id) FROM votes v 
        WHERE v.answer_id = a.id 
        AND v.vote = 1 GROUP BY a.id),0) as upvotes,

        COALESCE((SELECT COUNT (v.id) FROM votes v 
        WHERE v.answer_id = a.id 
        AND v.vote = 0 GROUP BY a.id),0) as downvotes,

        COALESCE((SELECT COUNT (c.id) FROM comments c 
        WHERE c.answer_id = a.id GROUP BY a.id),0) as comments,
        a.created_at,
        a.is_accepted

        FROM answers a 
        JOIN users u ON u.id = a.user_id
        WHERE a.question_id = $1 
        ORDER BY created_at DESC
        `,
      values: [id],
    };
  },
  /**
   * Post answer query function
   * @param {number} userId User id
   * @param {number} questionId Question id
   * @param {string} answer Answer
   * @returns {object} Post answer query object
   */
  postAnswer(userId, questionId, answer) {
    return {
      text: `
      INSERT into answers(user_id, question_id, answer, is_accepted) 
      VALUES($1, $2, $3, $4) 
      RETURNING id, answer, user_id, is_accepted, created_at
      `,
      values: [userId, questionId, answer, false],
    };
  },
  /**
   * Get answer query function
   * @param {number} id Answer id
   * @returns {object} Get answer query object
   */
  getAnswer(id) {
    return {
      text: `
      SELECT a.id, 
      answer, 
      question_id, 
      user_id, 
      u.name, 
      a.created_at, 
      is_accepted
    
      FROM answers a 
      JOIN users u ON user_id = u.id
      WHERE a.id = $1
      `,
      values: [id],
    };
  },
  /**
   * Update answer query function
   * @param {number} answerId Answer id to update
   * @param {string} field Field to update
   * @param {value} value Value of update field
   * @returns {object} Update answer query object
   */
  updateAnswer(answerId, field, value) {
    return {
      text: `
      UPDATE answers a
      SET ${field} = $2
      WHERE a.id = $1
      RETURNING *`,
      values: [answerId, value],
    };
  },
  /**
   * Check if a question has a previously accepted answer
   * @param {number} questionId Id of question to check
   * @returns {object} Query object
   */
  checkAccepted(questionId) {
    return {
      text: `
      SELECT id
      FROM answers
      WHERE question_id = $1 AND is_accepted = TRUE
      `,
      values: [questionId],
    };
  },

};

const voteQueries = {
  /**
   * Vote answer query function
   * @param {Array} array Array consisting of the query parameters
   * @returns {object} Vote answer query object
   */
  voteAnswer(array) {
    return {
      text: `
      INSERT INTO votes
      (answer_id, user_id, vote)
      VALUES ($1, $2, $3)
      RETURNING vote,
      COALESCE((SELECT COUNT (v.id) FROM votes v 
      WHERE v.answer_id = $1 
      AND v.vote = 1 GROUP BY answer_id),0) as upvotes,

      COALESCE((SELECT COUNT (v.id) FROM votes v 
      WHERE v.answer_id = $1
      AND v.vote = 0 GROUP BY answer_id),0) as downvotes
      `,
      values: array,
    };
  },
  /**
   * Get votes query function
   * @param {number} answerId Answer id
   * @param {number} userId User id
   * @returns {object} Get votes query object
   */
  getUserVote(answerId, userId) {
    return {
      text: `
      SELECT v.id,
      v.vote
      FROM votes v
      WHERE v.answer_id = $1 AND v.user_id = $2
      `,
      values: [answerId, userId],
    };
  },
  /**
   * Update vote query function
   * @param {number} voteId Vote id
   * @param {number} voteStatus Vote status
   * @returns {object} Update vote query object
   */
  updateVote(voteId, voteStatus) {
    return {
      text: `
      UPDATE votes
      SET vote = $2
      WHERE id = $1
      RETURNING vote
      `,
      values: [voteId, voteStatus],
    };
  },
  getAnswerVotes(id) {
    return {
      text: `
      SELECT vote
      FROM votes
      WHERE answer_id = $1
      `,
      values: [id],
    };
  },
};

const commentQueries = {
  /**
   * Post comment query function
   * @param {string} comment New comment to add
   * @param {number} userId User ID
   * @param {number} answerId Answer ID
   * @returns {object} Post comment query object
   */
  postComment(comment, userId, answerId) {
    return {
      text: `
        INSERT INTO comments(comment, user_id, answer_id)
        VALUES($1, $2, $3)
        RETURNING id, comment, user_id, created_at, answer_id
      `,
      values: [comment, userId, answerId],
    };
  },
  /**
   * Get comments query function
   * @param {number} answerId ID of answer to get comments for
   * @returns {object} Get comments query object
   */
  getComments(answerId) {
    return {
      text: `
      SELECT c.id, 
      comment, 
      user_id,
      u.name, 
      c.created_at
      FROM comments c
      JOIN users u ON u.id = user_id
      WHERE answer_id = $1
      `,
      values: [answerId],
    };
  },
};
export default {
  userQueries,
  questionQueries,
  answerQueries,
  voteQueries,
  commentQueries,
};
