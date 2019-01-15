import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getQuestions, searchQuestions,
} from '../../actions/getQuestionsActions';
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

  handleInputChange = (event) => {
    const { search } = this.props;
    search(event.target.value);
  }

  render() {
    const { searchedQuestions } = this.props;
    const { displayModal } = this.state;

    return (
      <div className="bg-light pos-rel">
        {
          displayModal
          && <QuestionModal hideModal={this.hideModal} />
        }
        <div className="" id="wrap">
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
                    <form>
                      <span>
                        <i className="fa fa-search fa-lg text-success p-1" />
                      </span>
                      <div className="d-i-block w-90">
                        <input
                          type="text"
                          className="search-input text-success"
                          placeholder="search questions"
                          data-testid="search-input"
                          onChange={this.handleInputChange}
                        />
                      </div>
                    </form>
                  </div>
                  <div>
                    {
                      searchedQuestions
                        && searchedQuestions.length > 0
                        ? searchedQuestions.map(question => (
                          <QuestionCard question={question} key={question.id} />
                        ))
                        : (
                          <div className="box fadeIn">
                            <p className="text-success text-center">
                              No results match your search
                            </p>
                          </div>
                        )
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
  search: PropTypes.func.isRequired,
  searchedQuestions: PropTypes.array,
};

QuestionsPage.defaultProps = {
  searchedQuestions: [],
};

const mapStateToProps = state => ({
  fetching: state.getQuestions.fetching,
  searchedQuestions: state.getQuestions.searchedQuestions,
  error: state.getQuestions.error,
});

const actions = {
  fetchQuestions: getQuestions,
  search: searchQuestions,
};

export default connect(mapStateToProps, actions)(QuestionsPage);
