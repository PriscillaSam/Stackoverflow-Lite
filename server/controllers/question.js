import repo from '../repository/dummy-repo/question';


class Question {
  /**
   * @function getQuestions Fetches all the questions available
   * @param {object} req Request object
   * @param {object} res Response object List of questions
   */
  static getQuestions(req, res) {
    res.status(200).json({
      status: 'success',
      message: 'questions successfully gotten',
      questions: repo.getQuestions(),
    });
  }

  /**
   * @function getQuestion Fetches a particular question by id
   * @param {object} req Request Object containing question id
   * @param {object} res Response object containing question
   */
  static getQuestion(req, res) {
    const questionId = parseInt(req.params.id, 10);

    const question = repo.getQuestion(questionId);
    if (question === null) {
      return res.status(404).json({
        status: 'error',
        message: 'this question does not exist',
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'question has been successfully gotten',
      question,
    });
  }
}

export default Question;
