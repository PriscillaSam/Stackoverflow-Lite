import joi from 'joi';
import validate from 'express-validation';

const validator = {
  validateId: validate({
    params: {
      id: joi.number().integer().required(),
    },
  }),
  validateQuestion: validate({
    body: {
      question: joi.string().required(),
      userId: joi.number().integer().required(),
    },
  }),
};


export default validator;
