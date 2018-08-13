import express from 'express';
import Question from '../controllers/question';

const router = express.Router();

router.get('/questions', Question.getQuestions);
router.get('/questions/:questionId', Question.getQuestion);

export default router;
