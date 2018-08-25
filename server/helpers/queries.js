/* eslint max-len: 0 */

const userQueries = {
  createUser(name, email, passHash) {
    return {
      text: 'INSERT into users(name, email, passHash) VALUES($1, $2, $3) RETURNING id, name, email',
      values: [name, email, passHash],
    };
  },
  getUser(email) {
    return {
      text: 'SELECT id, name, email, passHash FROM users WHERE email = $1',
      values: [email],
    };
  },
};

const questionQueries = {
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
};
const answerQueries = {
  getAnswersByQid(id) {
    return {
      text: 'SELECT id, answer, questionid, userid FROM answers WHERE questionId = $1',
      values: [id],
    };
  },
};

export default { userQueries, questionQueries, answerQueries };
