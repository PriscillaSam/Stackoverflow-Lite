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
};


export default { userQueries, questionQueries };
