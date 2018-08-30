/**
 * Checks the vote status type and value
 * @param {object} req Request Object
 * @param {object} res Response Object
 * @param {Function} next Next middleware
 * @returns {Function} Error object if field is empty or
 * wrong data type is passed
 */
const checkvote = (req, res, next) => {
  let { vote } = req.body;
  if (vote === null || vote === undefined) {
    return res.status(400).json({
      status: 'error',
      message: 'vote field is required',
    });
  }
  vote = parseInt(vote, 10);
  if (vote !== 0 && vote !== 1) {
    return res.status(400).json({
      status: 'error',
      message: 'vote field can only be 0 or 1',
    });
  }
  req.body.vote = vote;
  return next();
};

export default checkvote;
