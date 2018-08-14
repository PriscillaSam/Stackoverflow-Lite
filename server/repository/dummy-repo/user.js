import users from '../../models/dummy-models/user';

const repo = {
  /**
   * @function getUser Get's user by the user Id
   * @param {number} id user id to check for
   */
  getUser(id) {
    const user = users.find(u => u.id === id);
    if (user === null || user === undefined) return null;

    return user;
  },
};

export default repo;
