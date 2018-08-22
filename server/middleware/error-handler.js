/* eslint no-unused-vars: 0 */
/* eslint consistent-return: 0 */
import validator from 'express-validation';

/**
 * Handles and customizes incoming errors
 * @param {object} err Validation errors from joi and express validation
 * @param {object} req Request object
 * @param {object} res Response object
 * @param {Function} next Next middleware in the chain
 */
const errorHandler = (err, req, res, next) => {
  if (err instanceof validator.ValidationError) {
    if (Object.keys(err).length > 0) {
      let fields = [];
      let messages = [];
      const errorMessages = {};

      err.errors.forEach((error) => {
        fields = [...fields, ...error.field];
        messages = [...messages, ...error.messages];
      });

      messages = messages.map(msg => msg.replace('"', '').replace('"', ''));
      fields.forEach((field, index) => {
        errorMessages[field] = messages[index];
      });

      return res.status(400).json({
        status: err.statusText,
        errors: {
          fields,
          messages: errorMessages,
        },
      });
    }
  }
};

export default errorHandler;
