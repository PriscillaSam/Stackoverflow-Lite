import joi from 'joi';
import validate from 'express-validation';

const numJoi = joi.number().integer().required();
const stringJoi = joi.string().min(6).max(100).required();
const validator = {
  validateId: validate({
    params: {
      id: numJoi,
    },
  }),
  validateQuestion: validate({
    body: {
      question: stringJoi,
    },
  }),
  validateDelete: validate({
    params: {
      id: numJoi,
    },
  }),
  validatePostAnswer: validate({
    params: {
      id: numJoi,
    },
    body: {
      answer: stringJoi,
    },
  }),
  validateUpdateAnswer: validate({
    params: {
      answerId: numJoi,
      questionId: numJoi,
    },
  }),
  validateSignUp: validate({
    body: {
      name: stringJoi,
      email: joi.string().email().required(),
      password: stringJoi,
      confirmPassword: joi.string()
        .valid(joi.ref('password')).required().options({
          language: {
            any: {
              allowOnly: 'must match password',
            },
          },
        }),
    },
  }),
  validateLogin: validate({
    body: {
      email: joi.string().email().required(),
      password: joi.string().required(),
    },
  }),
};

export default validator;
