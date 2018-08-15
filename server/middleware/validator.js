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
      question: joi.string().required(),
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
      answer: joi.string().required(),
    },
  }),
};


export default validator;
