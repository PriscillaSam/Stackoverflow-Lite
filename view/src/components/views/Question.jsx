import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavBar from '../containers/NavBar';
import Button from '../button';
import Footer from '../containers/Footer';
import AnswerCard from '../containers/AnswerCard';
import isLoggedIn from '../../utilities/auth';
import { getQuestion } from '../../actions/getQuestionActions';
import timeFormatter from '../../utilities/timeFormatter';

class QuestionPage extends Component {
  state = {}

  componentDidMount() {
    const { match: { params: { id } }, fetchQuestion } = this.props;
    fetchQuestion(id);
  }

  render() {
    const { question, fetching } = this.props;

    return (
      <div className="bg-light pos-rel">
        <div className="pos-rel" id="wrap">
          <NavBar isLoggedIn={isLoggedIn()} />
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
                          {` ${question.answers.length}`}
                          answers
                        </span>
                      </p>
                    </div>
                    <div className="mt-2">
                      {
                        question.answers.length === 0
                        && <p className="">Be the first to answer this question</p>
                      }
                      {
                        question.answers.length > 0
                        && question.answers
                          .map(answer => (
                            <AnswerCard answer={answer} key={answer.id} />
                          ))
                      }
                    </div>
                    <h4 className="display-4 text-primary mb-1">
                      <i className="fa fa-reply mr-1" />
                      Your Answer
                    </h4>
                    <div className="">
                      <form id="answer-form">
                        <textarea
                          name=""
                          cols="30"
                          className="form-input"
                          rows="3"
                          placeholder="enter your response"
                          required
                        />
                        <Button
                          btnClassName="btn btn-success mt-1 w-20"
                          btnText="Submit"
                          onLoading={fetching}
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
});

const actions = {
  fetchQuestion: getQuestion,
};

QuestionPage.propTypes = {
  match: PropTypes.object.isRequired,
  question: PropTypes.object,
  fetching: PropTypes.bool.isRequired,
  fetchQuestion: PropTypes.func.isRequired,
};

QuestionPage.defaultProps = {
  question: {},
};

export default connect(mapStateToProps, actions)(QuestionPage);
