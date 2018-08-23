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
      text: 'SELECT email FROM users WHERE email = $1',
      values: [email],
    };
  },
};

export default userQueries;
