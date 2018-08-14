import express from 'express';
import Question from '../controllers/question';
import validator from '../middleware/validator';

const router = express.Router();

router.get('/questions', Question.getQuestions);
router.get('/questions/:id', validator.validateId, Question.getQuestion);
router.post('/questions/', validator.validateQuestion, Question.postQuestion);

export default router;
