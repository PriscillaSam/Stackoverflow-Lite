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
                message: 'This email is already in use',
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
                  name: newUser.name,
                  id: newUser.id,
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
                  name,
                  id,
                  token,
                });
              }
              return errors.authError(res);
            }
            return errors.authError(res);
          });
      });
  }

  /**
   * Get user profile
   * @param {object} req Request object
   * @param {object} res Response object
   * @returns {object} User activity history on the platform
   */
  static profile(req, res) {
    const { userId } = req.body;

    pool.connect()
      .then((client) => {
        client.release();
        client.query(queries.userQueries.getUserProfile(userId))
          .then((response) => {
            const [details] = response.rows;
            client.query(queries.questionQueries.getUserQuestions(userId))
              .then((userQuestions) => {
                const questions = userQuestions.rows;
                details.asked = questions.length;
                const recent = [...questions];
                recent.sort((q1, q2) => q1.createdat < q2.createdat);

                if (questions.length < 5) {
                  details.mostAnswered = questions
                    .filter(q => q.answers !== '0');
                  details.recent = recent;
                } if (questions.length > 5) {
                  details.mostAnswered = questions
                    .filter(q => q.answers !== '0').splice(0, 5);
                  details.recent = recent.splice(0, 5);
                }

                res.status(200).json(
                  details,
                );
              });
          });
      });
  }
}
export default User;
