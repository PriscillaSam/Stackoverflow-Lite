import answers from '../../models/dummy-models/answers';

const answerRepo = {
  answers,
  /**
   * Adds a new answer to the answers array
   * @param {object} answerObj Answer object
   */
  postAnswer(answerObj) {
    const { userId, questionId, answer } = answerObj;
    // process
    // check if user (user repo) and question (question repo) exist
    // check if user asked the question sorted
    // check if user has already answered (this repo)

    // get all the answers for this question
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
};

export default answerRepo;
