import express from 'express';

import Answer from '../controllers/answer';
import Question from '../controllers/question';
import User from '../controllers/user';
import Comment from '../controllers/comment';

import validator from '../middleware/validator';
import checkStatus from '../middleware/checkVoteStatus';
import auth from '../middleware/authManager';
import Validate from '../controllers/validate';

const router = express.Router();

router.post('/auth/signup',
  validator.validateSignUp,
  User.register);

router.post('/auth/login',
  validator.validateLogin,
  User.login);

router.get('/questions',
  Question.search,
  Question.getQuestions);

router.get('/questions/:id',
  validator.validateId,
  Validate.checkQuestionExists,
  Question.getQuestion);

router.use(auth.verifyToken);
router.get('/users/profile',
  User.profile);

router.get('/user/questions',
  Question.getUserQuestions);

router.post('/questions/',
  validator.validateQuestion,
  Question.postQuestion);

router.delete('/questions/:id',
  validator.validateDelete,
  Validate.checkQuestionExists,
  Question.deleteQuestion);

router.post('/questions/:questionId/answers/',
  validator.validatePostAnswer,
  Validate.checkQuestionExists,
  Answer.postAnswer);

router.put('/questions/:questionId/answers/:answerId',
  validator.validateUpdateAnswer,
  Validate.checkAnswerExist,
  Validate.checkQuestionExists,
  Answer.updateAnswer);

router.post('/questions/:questionId/answers/:answerId/comments',
  validator.validateComment,
  Validate.checkAnswerExist,
  Validate.checkQuestionExists,
  Comment.postComment);

router.use(checkStatus);
router.post('/answers/:id/votes',
  validator.validateDelete,
  Validate.checkAnswerExist,
  Answer.voteAnswer);

export default router;
