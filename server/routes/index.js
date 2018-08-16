import express from 'express';
import Question from '../controllers/question';
import Answer from '../controllers/answer';

import validator from '../middleware/validator';

const router = express.Router();

router.get('/questions', Question.getQuestions);
router.get('/questions/:id', validator.validateId, Question.getQuestion);
router.post('/questions/', validator.validateQuestion, Question.postQuestion);
router.delete('/questions/:id', validator.validateDelete, Question.deleteQuestion);

router.post('/questions/:id/answers/', validator.validatePostAnswer, Answer.postAnswer);
router.post('/questions/:questionId/answers/:answerId', validator.validateAcceptAnswer, Answer.acceptAnswer);
export default router;
