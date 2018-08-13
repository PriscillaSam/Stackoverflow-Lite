import express from 'express';
import Question from '../controllers/question';

const router = express.Router();

router.get('/questions', Question.getQuestions);

export default router;
