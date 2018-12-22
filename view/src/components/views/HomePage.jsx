import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getQuestions } from '../../actions/getQuestionsActions';
import QuestionCard from '../containers/QuestionCard';
import Footer from '../containers/Footer';
import isLoggedIn from '../../utilities/auth';

class HomePage extends Component {
  state = {}

  componentWillMount() {
    const { fetchQuestions } = this.props;
    fetchQuestions();
  }

  render() {
    const { questions } = this.props;
    return (
      <div className="bg-light pos-rel">
        <div className="pos-rel" id="wrap">
          <section className="banner fadeIn">
            <div className="overlay">
              <h1 className=" display-1 fadeInDown mt-0 mb-0">
                <a href="home.html">
                  StackOverflow-
                  <span className="brand-span">
                    LITE
                  </span>
                </a>
              </h1>
              <div className="mt-0">
                <h2 className="display-2 text-success  highlight mb-0">
                  Ask Questions.
                </h2>
                <h2 className="display-2 text-white  highlight mt-0">
                  Give Answers.
                </h2>
              </div>
              {
                !isLoggedIn()
                && (
                  <Link
                    className="btn btn-success p-large"
                    to="/account/signup"
                  >
                  Sign Up Here
                  </Link>
                )
              }

            </div>
          </section>
          <section className=" mb-0">
            <div className="container">
              <div className="pt-2 mb-2">
                <h2 className="display-3 mt-0 ">Recent / Questions</h2>
              </div>
              <div className="questions w-70">
                {
                  questions
                  && questions.length
                  && questions.filter((_, index) => index < 5).map(question => (
                    <QuestionCard question={question} key={question.id} />
                  ))
                }
              </div>
              <div>
                <p className="d-i-block mr-1">
                  <Link to="/" className="text-primary">
                    View full list
                    <i className="fa fa-fw fa-angle-double-right" />
                  </Link>
                </p>
                <p className="d-i-block">
                  <Link className="btn btn-default" to="/account/login">
                    Ask a question
                  </Link>
                </p>
              </div>
            </div>
          </section>
          <Footer />
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  fetchQuestions: PropTypes.func.isRequired,
  questions: PropTypes.array,
};

HomePage.defaultProps = {
  questions: [],
};

const mapStateToProps = state => ({
  fetching: state.getQuestions.fetching,
  questions: state.getQuestions.questions,
  error: state.getQuestions.error,
});

const actions = {
  fetchQuestions: getQuestions,
};

export default connect(mapStateToProps, actions)(HomePage);
