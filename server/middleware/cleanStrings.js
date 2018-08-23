/**
 * Removes whitespaces from incoming strings
 * @param {object} req Request Object
 * @param {object} res Response Objects
 * @return {Function} Next Calls the next middleware
 */

const cleanStrings = (req, res, next) => {
  Object.keys(req.body).forEach((key) => {
    if (typeof req.body[key] === 'string') {
      req.body[key] = req.body[key]
        .replace(/  +/g, ' ')
        .trim();
    }
  });
  return next();
};

export default cleanStrings;
