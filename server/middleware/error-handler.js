/* eslint no-unused-vars: 0 */
/* eslint consistent-return: 0 */

import validator from 'express-validation';

const errorHandler = (err, req, res, next) => {
  if (err instanceof validator.ValidationError) {
    if (Object.keys(err).length > 0) {
      let fields = [];
      let messages = [];

      err.errors.forEach((error) => {
        fields = [...fields, ...error.field];
        messages = [...messages, ...error.messages];
      });

      return res.status(400).json({
        errors: {
          status: err.status,
          statusText: err.statusText,
          errors: {
            field: fields,
            messages,
          },
        },

      });
    }
  }
};

export default errorHandler;
