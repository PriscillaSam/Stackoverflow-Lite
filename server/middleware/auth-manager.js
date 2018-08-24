import jwt from 'jsonwebtoken';
import config from '../config/config';

const auth = {
  /**
   *Generates a token based on a user's id
   * @param {number} id User id
   * @param {number} name User name
   * @param {number} email User email
   * @returns {string} Token
   */
  generateToken(id, name, email) {
    const secretKet = config.secret;
    const jwtData = {
      expiresIn: 86400,
    };

    const token = jwt.sign({ id, name, email }, secretKet, jwtData);
    return token;
  },
};

export default auth;
