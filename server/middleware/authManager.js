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
  /**
   * Verifies the user token
   * @param {object} req Request object
   * @param {object} res Response object
   * @param {function} next Next middleware
   * @returns {object} Next middleware or error object if token is invalid
   */
  verifyToken(req, res, next) {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({
          status: 'error',
          message: 'User not authenticated. No token provided.',
        });
      }

      jwt.verify(token, config.secret, (err, decoded) => {
        req.body.userId = decoded.id;
        next();
      });
    } catch (error) {
      return res.status(401).json({
        status: 'error',
        message: 'failed to authenticate token',
      });
    }
  },
};

export default auth;
