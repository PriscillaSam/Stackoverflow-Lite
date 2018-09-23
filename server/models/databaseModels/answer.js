import answers from '../dummyModels/answers';

let answerValues = '';

const getAnswers = () => {
  answers.forEach((answer, index) => {
    if (index === answers.length - 1) {
      answerValues += `
      ('${answer.userId}', 
      '${answer.answer}', 
      '${answer.questionId}', 
      '${answer.isAccepted}')
      `;
    } else {
      answerValues += `
      ('${answer.userId}', 
      '${answer.answer}', 
      '${answer.questionId}', 
      '${answer.isAccepted}'),
      `;
    }
  });
  return answerValues;
};

const seedAnswer = `
INSERT INTO answers
(user_id, answer, question_id, is_accepted) 
VALUES ${getAnswers()}`;

export default seedAnswer;
