import express from 'express';
import Question from '../controllers/question';
import Answer from '../controllers/answer';
import User from '../controllers/user';

import validator from '../middleware/validator';
import checkStatus from '../middleware/checkVoteStatus';
import auth from '../middleware/authManager';

const router = express.Router();

router.post('/auth/signup', validator.validateSignUp, User.register);
router.post('/auth/login', validator.validateLogin, User.login);

router.get('/questions', Question.getQuestions);
router.get('/questions/:id', validator.validateId, Question.getQuestion);

router.use(auth.verifyToken);
router.post('/questions/', validator.validateQuestion, Question.postQuestion);

router.delete('/questions/:id',
  validator.validateDelete, Question.deleteQuestion);

router.post('/questions/:id/answers/', 
  validator.validatePostAnswer, Answer.postAnswer);

router.put('/questions/:questionId/answers/:answerId',
  validator.validateUpdateAnswer, Answer.updateAnswer);

router.use(checkStatus);
router.post('/answers/:id', validator.validateDelete, Answer.voteAnswer);

export default router;
