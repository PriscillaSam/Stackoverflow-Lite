import questions from '../dummy-models/questions';

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
INSERT INTO questions (question, userid) VALUES ${getQUestions()}`;

export default seedQuestion;
