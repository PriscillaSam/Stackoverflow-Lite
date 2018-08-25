import answers from '../dummy-models/answers';

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
(userid, answer, questionId, isaccepted) 
VALUES ${getAnswers()}`;

export default seedAnswer;
