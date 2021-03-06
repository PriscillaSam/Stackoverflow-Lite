import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavBar from '../containers/NavBar';
import Button from '../button';
import Footer from '../containers/Footer';
import QuestionModal from '../containers/QuestionModal';
import AnswerCard from '../containers/AnswerCard';
import isLoggedIn from '../../utilities/auth';
import { getQuestion, acceptAnswer } from '../../actions/getQuestionActions';
import { postAnswer } from '../../actions/postAnswerActions';
import timeFormatter from '../../utilities/timeFormatter';
import { favoriteAnswer } from '../../utilities/functionCalls';

class QuestionPage extends Component {
  state = {
    answer: '',
    acceptedAnswerId: '',
    displayModal: false,
    confirmAnswer: false,
  }

  componentDidMount() {
    const { match: { params: { id } }, fetchQuestion } = this.props;
    fetchQuestion(id);
  }

  submitAnswer = (event) => {
    event.preventDefault();
    const { match: { params: { id } }, submitAnswer } = this.props;
    const { answer } = this.state;
    submitAnswer({ id, answer });
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  displayModal = (event) => {
    event.preventDefault();
    this.setState({ displayModal: true });
  }

  hideModal = (event) => {
    event.preventDefault();
    this.setState({ displayModal: false });
    this.setState({ confirmAnswer: false });
  }

  displayConfirmModal = (event) => {
    event.preventDefault();
    this.setState({ confirmAnswer: true, acceptedAnswerId: event.target.id });
  }

  acceptAnswer = (event) => {
    event.preventDefault();
    const { acceptedAnswerId } = this.state;
    const { match: { params: { id } }, accept } = this.props;
    favoriteAnswer(id, acceptedAnswerId);

    this.setState({ confirmAnswer: false });
    setTimeout(() => {
      accept(acceptedAnswerId);
    });
  }

  render() {
    const {
      question, fetching, posting, answers,
    } = this.props;

    const { displayModal, confirmAnswer } = this.state;

    return (
      <div className="bg-light pos-rel">
        {
          displayModal
          && <QuestionModal hideModal={this.hideModal} />
        }
        {
          confirmAnswer
          && (
            <div className="modal">
              <div className="modal-body confirmBox slideInUp p-2">
                <button
                  type="button"
                  className="btn close"
                  onClick={this.hideModal}
                  data-testid="hide-btn"
                >
                  <span>&times;</span>
                </button>
                <div className="modal-title">
                  <h3 className="display-3">
                    <i className="fa fa-edit mr-1" />
                    Mark this answer as your accepted answer.
                  </h3>
                  <hr />
                </div>
                <div className="">
                  <p className="d-i-block mr-1">
                    <button
                      className="btn btn-sm btn-success p-1"
                      type="button"
                      onClick={this.hideModal}
                    >
                      Cancel
                    </button>
                  </p>
                  <p className="d-i-block">
                    <button
                      className="btn btn-danger btn-sm p-1"
                      type="button"
                      id="confirm"
                      onClick={this.acceptAnswer}
                    >
                      Accept
                    </button>
                  </p>
                </div>
              </div>
            </div>
          )
        }

        <div className="pos-rel" id="wrap">
          <NavBar
            isLoggedIn={isLoggedIn()}
            displayModal={this.displayModal}
            displayQuestionLink
          />
          <div className="container">
            <div className="content-container">
              {
                question
                && !fetching
                && (
                  <section className="w-70 ">
                    <div id="question-section">
                      <h4 className="display-4 text-primary mb-0 fadeIn">
                        <i className="fas fa-edit mr-1" />
                        <strong>{question.question}</strong>
                      </h4>
                      <p className="mt-0">
                        <span className="mr-1">
                          {'asked '}
                          {timeFormatter(question.created_at)}
                        </span>
                        <span className="mr-1">
                          <i className="far fa-user fa-fw" />
                          {` ${question.name}`}
                        </span>
                        <span className="text-success">
                          <i className="far fa-comments fa-fw" />
                          {` ${question.answers.length} `}
                          answers
                        </span>
                      </p>
                    </div>
                    <div className="mt-2">
                      {
                        question.answers.length === 0
                        && (
                          <p className="">
                            Be the first to answer this question
                          </p>
                        )
                      }
                      {
                        !posting && answers
                        && answers.map(answer => (
                          <AnswerCard
                            answer={answer}
                            userId={question.user_id.toString()}
                            key={answer.id}
                            displayModal={this.displayConfirmModal}
                          />
                        ))
                      }
                      {
                        question.answers.length > 0
                        && question.answers
                          .map(ans => (
                            <AnswerCard
                              answer={ans}
                              userId={question.user_id.toString()}
                              key={ans.id}
                              displayModal={this.displayConfirmModal}
                            />
                          ))
                      }
                    </div>
                    <h4 className="display-4 text-primary mb-1">
                      <i className="fa fa-reply mr-1" />
                      Your Answer
                    </h4>
                    <div className="">
                      <form
                        onSubmit={this.submitAnswer}
                        data-testid="answer-form"
                      >
                        <textarea
                          name="answer"
                          data-testid="answer-input"
                          cols="30"
                          className="form-input"
                          rows="3"
                          placeholder="enter your response"
                          onChange={this.handleChange}
                          minLength="8"
                          required
                        />
                        <Button
                          btnClassName="btn btn-success mt-1 w-20 p-1"
                          btnText="Submit"
                          onLoading={posting}
                          disabled={!isLoggedIn()}
                          type="submit"
                        />
                        {
                          !isLoggedIn()
                          && (
                            <p className="text-sm notify-login">
                              You need to
                              <Link
                                to="/account/signup"
                                className="text-success"
                              >
                                {' Signup '}
                              </Link>
                              to post your answer.
                            </p>
                          )
                        }
                      </form>
                    </div>
                  </section>
                )
              }
              <section />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fetching: state.singleQuestion.fetching,
  question: state.singleQuestion.question,
  error: state.singleQuestion.error,
  posting: state.postAnswer.posting,
  answers: state.postAnswer.answers,
  answerError: state.postAnswer.error,
});

const actions = {
  fetchQuestion: getQuestion,
  submitAnswer: postAnswer,
  accept: acceptAnswer,
};

QuestionPage.propTypes = {
  match: PropTypes.object.isRequired,
  question: PropTypes.object,
  fetching: PropTypes.bool.isRequired,
  fetchQuestion: PropTypes.func.isRequired,
  posting: PropTypes.bool.isRequired,
  answers: PropTypes.array,
  submitAnswer: PropTypes.func.isRequired,
  accept: PropTypes.func.isRequired,
};

QuestionPage.defaultProps = {
  question: {},
  answers: [],
};

export default connect(mapStateToProps, actions)(QuestionPage);
