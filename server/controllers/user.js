import pool from '../config/db.config';
import encrypt from '../helpers/passwordHasher';
import auth from '../middleware/auth-manager';
import userQueries from '../helpers/queries';

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
        client.query(userQueries.getUser(email))
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


            client.query(userQueries.createUser(name, email, passHash))
              .then((user) => {
                const [newUser] = user.rows;
                client.release();
                const token = auth.generateToken(newUser.id);

                return res.status(201).json({
                  status: 'success',
                  message: `Hi ${newUser.name}. Welcome to Stackoverflow-Lite`,
                  token,
                });
              });
          });
      })
      .catch((e) => {
        return res.status(500).json({
          status: 'error',
          message: 'something went wrong',
        });
      });
  }
}

export default User;
