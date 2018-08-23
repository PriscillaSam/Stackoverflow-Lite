import joi from 'joi';
import validate from 'express-validation';

const numJoi = joi.number().integer().required();
const validator = {
  validateId: validate({
    params: {
      id: numJoi,
    },
  }),
  validateQuestion: validate({
    body: {
      question: joi.string().min(10).max(100).required(),
      userId: numJoi,
    },
  }),
  validateDelete: validate({
    params: {
      id: numJoi,
    },
    body: {
      userId: numJoi,
    },
  }),
  validatePostAnswer: validate({
    params: {
      id: numJoi,
    },
    body: {
      userId: numJoi,
      answer: joi.string().min(10).max(100).required(),
    },
  }),
  validateAcceptAnswer: validate({
    params: {
      answerId: numJoi,
      questionId: numJoi,
    },
    body: {
      userId: numJoi,
    },
  }),
  validateSignUp: validate({
    body: {
      name: joi.string().required(),
      email: joi.string().email().required(),
      password: joi.string().required(),
    },
  }),
};

export default validator;
