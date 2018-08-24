import bcrypt from 'bcrypt';

const encrypt = {
  /**
   * Encrypts a string by hashing
   * @param {string} string string to be hashed
   * @returns {string} Hashed string
   */
  hashString(string) {
    const saltRounds = 10;
    const stringHash = bcrypt.hashSync(string, saltRounds);
    return stringHash;
  },
};

export default encrypt;
