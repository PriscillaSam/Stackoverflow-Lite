import answers from '../../models/dummy-models/answers';

const answerRepo = {
  answers,
  /**
   * Adds a new answer to the answers array
   * @param {object} answerObj Answer object
   */
  postAnswer(answerObj) {
    const { userId, questionId, answer } = answerObj;

    const userAnswer = this.answers.find(a => a.userId === userId && a.questionId === questionId);
    if (userAnswer) {
      return 'not allowed';
    }
    const ids = this.answers.map(q => q.id);
    const newAnswer = {
      id: Math.max(...ids) + 1,
      userId,
      questionId,
      answer,
      upvotes: 0,
      downvotes: 0,
      isAccepted: false,
    };

    this.answers.push(newAnswer);
    return newAnswer;
  },
  /**
   * Gets an answer by id
   * @param {number} id Answer Id to check for
   * @returns Answer object if answer exists or null
   */
  getAnswer(id) {
    const answer = this.answers.find(a => a.id === id);
    if (!answer) return null;
    return answer;
  },
  /**
   * Marks an answer as accepted
   * @param {number} id AnswerId of answer to accept
   */
  acceptAnswer(id) {
    const answer = this.answers.find(a => a.id);
    const index = this.answers.indexOf(answer);
    answer.isAccepted = true;
    const acceptedAnswer = this.answers.splice(index, 1, answer);
    return acceptedAnswer[0];
  },
};

export default answerRepo;
