import pool from '../config/db.config';
import encrypt from '../helpers/passwordHasher';
import auth from '../middleware/authManager';
import queries from '../helpers/queries';
import errors from '../helpers/errorMessages';

/**
 * User controller class
 */
class User {
  /**
   * Registers new user
   * @param {object} req Request object
   * @param {object} res Response object
   * @returns {object} Response based on signup success or failure
   */
  static register(req, res) {
    const { name, email, password } = req.body;

    pool.connect()
      .then((client) => {
        client.query(queries.userQueries.getUser(email))
          .then((response) => {
            const [existingEmail] = response.rows;
            if (existingEmail) {
              client.release();
              return res.status(409).json({
                status: 'error',
                message: 'this email is already in use',
              });
            }

            const passHash = encrypt.hashString(password);


            client.query(queries.userQueries.createUser(name, email, passHash))
              .then((user) => {
                const [newUser] = user.rows;
                client.release();
                const token = auth
                  .generateToken(newUser.id, newUser.name, newUser.email);

                return res.status(201).json({
                  status: 'success',
                  message: `Hi ${newUser.name}. Welcome to Stackoverflow-Lite`,
                  token,
                });
              });
          });
      });
  }

  /**
   * Logs in user
   * @param {object} req Request object
   * @param {object} res Response object
   * @returns {object} Login success or error object
   */
  static login(req, res) {
    const { email, password } = req.body;

    pool.connect()
      .then((client) => {
        client.query(queries.userQueries.getUser(email))
          .then((response) => {
            if (response.rows.length > 0) {
              client.release();
              const [existingUser] = response.rows;

              const passwordMatches = encrypt
                .matchString(password, existingUser.passhash);

              if (passwordMatches) {
                const { id, name } = existingUser;
                const token = auth
                  .generateToken(id, name, existingUser.email);
                return res.status(200).json({
                  status: 'success',
                  message: `Welcome back ${name}. Login successful`,
                  token,
                });
              }
              return errors.authError(res);
            }
            return errors.authError(res);
          });
      });
  }
}

export default User;
