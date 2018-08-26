/* eslint max-len: 0 */

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
      text: 'INSERT into users(name, email, passHash) VALUES($1, $2, $3) RETURNING id, name, email',
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
      text: 'SELECT id, name, email, passHash FROM users WHERE email = $1',
      values: [email],
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
     q.createdat, 
     u.id as userid,
     name,
     COALESCE((SELECT COUNT (a.id) FROM answers a WHERE a.questionid = q.id GROUP BY q.id),0) as answers
    FROM questions q 
    JOIN users u ON u.id = q.userid
    `;
    return query;
  },
  /**
   * Get question query method
   * @param {number} id Question id
   * @returns {string} Get question query
   */
  getQuestion(id) {
    return {
      text: `
    SELECT
      q.id,
      question,
      u.id as userId,
      name
    FROM questions q
    JOIN users u ON u.id = q.userid
    WHERE q.id = $1
    ;
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
      text: 'INSERT into questions(question, userid) VALUES($1, $2) RETURNING id, question',
      values: [question, userId],
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
};

const answerQueries = {
  /**
   * Get a question's answers query function
   * @param {number} id Question id
   * @returns {object} Get answers query object
   */
  getAnswersByQId(id) {
    return {
      text: `
        SELECT 
        a.id, 
        answer,
        u.id as userid,
        u.name,
        COALESCE((SELECT COUNT (v.id) FROM votes v WHERE v.answerid = a.id AND v.votestatus = 1 GROUP BY a.id),0) as upvotes,
        COALESCE((SELECT COUNT (v.id) FROM votes v WHERE v.answerid = a.id AND v.votestatus = 0 GROUP BY a.id),0) as downvotes
        FROM answers a 
        JOIN users u ON u.id = a.userid
        WHERE a.questionid = $1 `,
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
      INSERT into answers(userid, questionid, answer, isaccepted) 
      VALUES($1, $2, $3, $4) 
      RETURNING id, answer, userid, isaccepted, updatedat
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
      text: 'SELECT id, answer, questionid, userid FROM answers a WHERE a.id = $1',
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
};


export default { userQueries, questionQueries, answerQueries };
