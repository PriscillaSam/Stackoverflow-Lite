/**
 * Checks the vote status type and value
 * @param {object} req Request Object
 * @param {object} res Response Object
 * @param {Function} next Next middleware
 * @returns {Function} Error object if field is empty or wrong data type is passed
 */
const checkvoteStatus = (req, res, next) => {
  let { voteStatus } = req.body;
  if (voteStatus === null || voteStatus === undefined) {
    return res.status(400).json({
      status: 'error',
      message: 'voteStatus field is required',
    });
  }
  voteStatus = parseInt(voteStatus, 10);
  if (voteStatus !== 0 && voteStatus !== 1) {
    return res.status(400).json({
      status: 'error',
      message: 'voteStatus field can only be 0 or 1',
    });
  }
  req.body.voteStatus = voteStatus;
  return next();
};

export default checkvoteStatus;
