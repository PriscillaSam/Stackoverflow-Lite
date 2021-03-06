/**
 * Error messages
 */
const errors = {
  notFound(res, prop) {
    return res.status(404).json({
      status: 'error',
      message: `this ${prop} does not exist`,
    });
  },
  unauthorized(res) {
    return res.status(403).json({
      status: 'error',
      message: 'you are not allowed to perform this operation',
    });
  },
  authError(res) {
    return res.status(404).json({
      status: 'error',
      message: 'Failed to authenticate user. Invalid email or password',
    });
  },
};

export default errors;
