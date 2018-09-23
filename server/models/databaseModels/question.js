import questions from '../dummyModels/questions';

let questionValues = '';

const getQUestions = () => {
  questions.forEach((question, index) => {
    if (index === questions.length - 1) {
      questionValues += `('${question.question}', '${question.user.id}')`;
    } else {
      questionValues += `('${question.question}', '${question.user.id}'),`;
    }
  });
  return questionValues;
};

const seedQuestion = `
INSERT INTO questions (question, user_id) VALUES ${getQUestions()};
UPDATE questions q1
SET question_tokens = to_tsvector(q1.question)`;

export default seedQuestion;
