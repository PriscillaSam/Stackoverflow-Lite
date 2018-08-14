import joi from 'joi';
import validate from 'express-validation';

const numJoi = joi.number().integer();
const validator = {
  validateId: validate({
    params: {
      id: numJoi.required(),
    },
  }),
  validateQuestion: validate({
    body: {
      question: joi.string().required(),
      userId: numJoi.required(),
    },
  }),
  validateDelete: validate({
    params: {
      id: numJoi.required(),
    },
    body: {
      userId: numJoi.required(),
    },
  }),
};


export default validator;
