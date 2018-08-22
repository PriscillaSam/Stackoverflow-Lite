import users from '../../models/dummy-models/user';

const repo = {
  /**
   * @function getUser Get's user by the user Id
   * @param {number} id user id to check for
   */
  getUser(id) {
    const existingUser = users.find(user => user.id === id);
    if (existingUser === null || existingUser === undefined) return null;

    return existingUser;
  },
};

export default repo;
