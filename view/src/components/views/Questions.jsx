import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getQuestions } from '../../actions/getQuestionsActions';
import QuestionCard from '../containers/QuestionCard';
import QuestionModal from '../containers/QuestionModal';
import NavBar from '../containers/NavBar';
import Footer from '../containers/Footer';
import isLoggedIn from '../../utilities/auth';


class QuestionsPage extends Component {
  state = {
    displayModal: false,
  }

  componentWillMount() {
    const { fetchQuestions } = this.props;
    fetchQuestions();
  }

  displayModal = (event) => {
    event.preventDefault();
    this.setState({ displayModal: true });
  }

  hideModal = (event) => {
    event.preventDefault();
    this.setState({ displayModal: false });
  }

  render() {
    const { questions, fetching } = this.props;
    const { displayModal } = this.state;

    return (
      <div className="bg-light pos-rel">
        {
          displayModal
          && <QuestionModal hideModal={this.hideModal} />
        }
        <div className="pos-rel" id="wrap">
          <NavBar
            isLoggedIn={isLoggedIn()}
            displayModal={this.displayModal}
            displayQuestionLink
          />
          <div className="container">
            <div className="content-container mt-2">
              <section className="w-20 aside">
                <ul>
                  <li>
                    <i className="fa fa-clock-o mr-1 text-success" />
                    Date
                    <ul className="mt-1">
                      <li>
                        <a href="#/">
                          Yesterday
                          <span className="badge badge-dark">
                            200
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#/">
                          Last Week
                          <span className="badge badge-success">
                            4k
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#/">
                          1 month ago
                          <span className="badge badge-dark">
                            20k
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#/">
                          A year ago
                          <span className="badge badge-success">
                            40k
                          </span>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="mt-2">
                    <i className="fa fa-tags text-success mr-1" />
                    Tags
                    <ul className="mt-1">
                      <li>
                        <a href="#/">
                          Science
                          <span className="badge badge-dark">
                            200
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#/">
                          Art
                          <span className="badge badge-success">
                            200
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="/#">
                          Music
                          <span className="badge badge-dark">
                            200
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#/">
                          Relationships
                          <span className="badge badge-success">
                            2k
                          </span>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="mt-2">
                    <a href="#/">
                      <i className="fa fa-bar-chart-o text-success mr-1" />
                      Most Answered
                    </a>
                  </li>
                </ul>
              </section>
              <section className="w-70">
                <h3 className="display-3 text-primary">
                  Recently Asked / Questions
                </h3>
                <div className="w-70">
                  <div className="box">
                    <form id="search-form">
                      <div className="d-i-block w-90">
                        <input type="text" className="form-input" placeholder="search questions - enter keywords" id="search-input" />
                      </div>
                      <button type="submit" className="btn btn-success p-1" id="search-btn">
                        <span className="spinner hidden">
                          <i className="fa fa-spin fa-spinner fa-lg" />
                        </span>
                        <span className="btnText"><i className="fa fa-search fa-lg" /></span>
                      </button>
                    </form>
                  </div>
                  <div id="no-results" />
                  <div id="questions">
                    {
                      questions
                      && questions.length
                      && questions.map(question => (
                        <QuestionCard question={question} key={question.id} />
                      ))
                    }
                  </div>
                </div>
              </section>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

QuestionsPage.propTypes = {
  fetchQuestions: PropTypes.func.isRequired,
  questions: PropTypes.array,
};

QuestionsPage.defaultProps = {
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

export default connect(mapStateToProps, actions)(QuestionsPage);
