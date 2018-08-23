import jwt from 'jsonwebtoken';
import config from '../config/config';

const auth = {
  /**
   *Generates a token based on a user's id
   * @param {number} id User id
   * @returns {string} Token
   */
  generateToken(id) {
    const secretKet = config.secret;
    const jwtData = {
      expiresIn: 86400,
    };

    const token = jwt.sign({ id }, secretKet, jwtData);
    return token;
  },
};

export default auth;
