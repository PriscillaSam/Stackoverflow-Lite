import users from '../../models/dummy-models/user';

const repo = {
  /**
   * Get's a user by the user Id
   * @param {number} id user id to check for
   * @returns {object} User object
   */
  getUser(id) {
    const existingUser = users.find(user => user.id === id);
    if (existingUser === null || existingUser === undefined) return null;

    return existingUser;
  },
};

export default repo;
