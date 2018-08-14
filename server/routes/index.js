import express from 'express';
import Question from '../controllers/question';
import validateId from '../middleware/validator';

const router = express.Router();

router.get('/questions', Question.getQuestions);
router.get('/questions/:id', validateId, Question.getQuestion);

export default router;
