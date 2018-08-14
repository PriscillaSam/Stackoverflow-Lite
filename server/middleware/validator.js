import joi from 'joi';
import validate from 'express-validation';

const validateId = validate({
  params: {
    id: joi.number().integer().required(),
  },
});


const validateQuestion = validate({
  body: {
    question: joi.string().alphanum().required(),
    userId: joi.number().integer().required(),
  },
});


export default validateId;
