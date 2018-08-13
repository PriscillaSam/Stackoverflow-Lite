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
}

export default Question;
