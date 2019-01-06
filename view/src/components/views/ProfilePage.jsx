import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavBar from '../containers/NavBar';
import Footer from '../containers/Footer';
import AlertBox from '../alertBox';
import QuestionCard from '../containers/QuestionCard';
import isLoggedIn from '../../utilities/auth';
import { getProfile, removeQuestion } from '../../actions/profileActions';
import { postQuestion } from '../../actions/postQuestionActions';
import deleteQuestion from '../../utilities/functionCalls';

class ProfilePage extends Component {
  state = {
    question: '',
    questionId: '',
    displayModal: false,
  }

  componentDidMount() {
    const { getUserProfile } = this.props;
    getUserProfile();
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  submit = (event) => {
    event.preventDefault();
    const { question } = this.state;
    const { sendQuestion } = this.props;

    sendQuestion(question);
  }

  displayDeleteModal = (event) => {
    event.preventDefault();
    this.setState({ displayModal: true, questionId: event.target.id });
  }

  hideDeleteModal = (event) => {
    event.preventDefault();
    this.setState({ displayModal: false });
  }

  deleteQuestion = (event) => {
    event.preventDefault();
    const { questionId } = this.state;
    const { hideQuestion } = this.props;
    deleteQuestion(questionId);
    setTimeout(() => {
      this.setState({ displayModal: false });
      hideQuestion(questionId);
    }, 100);
  }

  render() {
    const loggedIn = isLoggedIn();
    if (!loggedIn) {
      return <Redirect to="/" />;
    }

    const {
      profile, posting,
    } = this.props;

    const { displayModal } = this.state;

    return (
      <div className="bg-light pos-rel" id="wrap">
        <NavBar isLoggedIn={loggedIn} displayQuestionLink={false} />
        <div className="container" id="split">
          <div className="content-container ">
            <section className=" mt-2">
              <h3 className="display-3">Activity / History</h3>
              <section
                className="content-container fadeIn mt-2"
                style={{ justifyContent: 'flex-start' }}
              >
                <div className="box2 mr-3">
                  <div className="d-i-block p-2 bg-dark">
                    <i className="far fa-3x fa-comment-alt text-success" />
                  </div>
                  <div className="d-i-block pr-1">
                    <h3 className="display-3 mb-0 text-primary ml-1">
                      Questions asked
                    </h3>
                    <p className="mt-0 text-success ml-1 ">
                      {profile && profile.asked}
                    </p>
                  </div>
                </div>
                <div className="box2 mr-3">
                  <div className="d-i-block p-2 bg-dark">
                    <i className="far fa-3x fa-comments text-success" />
                  </div>
                  <div className="d-i-block pr-1">
                    <h3 className="display-3 mb-0 text-primary ml-1">
                      Answers given
                    </h3>
                    <p className="mt-0 text-success ml-1">
                      {profile && profile.answers}
                    </p>
                  </div>
                </div>
              </section>
              <div className="mt-4">
                <h3 className="display-3">Your Recent / Questions</h3>
                <div id="recent">
                  {
                    profile && profile.recent.length > 0
                      ? profile.recent.map(question => (
                        <QuestionCard
                          question={question}
                          key={question.id}
                          displayModal={this.displayDeleteModal}
                        />))
                      : (
                        <div className="box">
                          <p className="text-danger text-center">
                            {'You haven\'t asked any question yet'}
                          </p>
                        </div>
                      )
                  }
                </div>
              </div>
              <div className="mt-4">
                <h3 className="display-3">Most Answered / Questions</h3>
                <div>
                  {
                    profile && profile.most_answered
                      && profile.most_answered.length > 0
                      ? profile.most_answered.map(question => (
                        <QuestionCard
                          question={question}
                          id={question.id}
                          key={question.id}
                          displayModal={this.displayDeleteModal}
                        />))
                      : (
                        <div className="box">
                          <p className="text-danger text-center">
                            None of your questions has been answered
                          </p>
                        </div>
                      )
                  }
                </div>
              </div>
            </section>
            <section className="w-40 mt-150">
              <h4 className="display-4 text-primary mb-0 fadeIn">
                <i className="fa fa-edit fa-fw" />
                <strong>What is on your mind?</strong>
              </h4>
              <h3 className="display-3 mt-0 ml-3">Ask a question</h3>
              <div>
                <form data-testid="question-form" onSubmit={this.submit}>
                  {/* {
                      sent
                      && (
                        <AlertBox
                          detail="You have posted your question."
                          theme="success"
                        />
                      )
                    } */}
                  <div className="input-area">
                    <textarea
                      name="question"
                      cols="30"
                      rows="10"
                      className="form-input"
                      placeholder="type your question here..."
                      onChange={this.handleInputChange}
                      data-testid="question-input"
                      minLength="8"
                      required
                    />
                  </div>
                  <div className="input-area right">
                    <button
                      type="submit"
                      className="btn btn-success p-1"
                      id="question-btn"
                    >
                      {
                        posting
                        && (
                          <span className="spinner">
                            <i
                              className="fa fa-spin fa-spinner fa-lg fa-fw"
                            />
                          </span>
                        )
                      }
                      <span className="btnText">
                        {
                          !posting
                            ? (
                              <span>
                                <i className="fa fa-share fa-fw" />
                                Post Question
                              </span>
                            )
                            : <span>Sending</span>
                        }
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </section>
          </div>
        </div>
        {
          displayModal
          && (
            <div className="modal">
              <div className="modal-body slideInUp p-2">
                <a
                  href="/#"
                  className="close cl-modal"
                  data-testid="cancelBtn"
                  onClick={this.hideDeleteModal}
                >
                  <span className="">&times;</span>
                </a>
                <div className="modal-title">
                  <p className="display-3">
                    <i className="fas fa-exclamation-circle fa-lg mr-1" />
                    Are you sure you want to delete this question?
                  </p>
                  <hr />
                </div>
                <div className="">
                  <p className="d-i-block">
                    <button
                      className="btn btn-danger btn-sm p-1"
                      type="button"
                      id="confirm"
                      data-testid="confirmBtn"
                      onClick={this.deleteQuestion}
                    >
                      Confirm delete
                    </button>
                  </p>
                </div>
              </div>
            </div>
          )
        }
        <Footer />
      </div>
    );
  }
}

ProfilePage.propTypes = {
  getUserProfile: PropTypes.func.isRequired,
  profile: PropTypes.object,
  sendQuestion: PropTypes.func.isRequired,
  hideQuestion: PropTypes.func.isRequired,
  posting: PropTypes.bool.isRequired,
};

ProfilePage.defaultProps = {
  profile: {},
};

const mapStateToProps = state => ({
  fetching: state.userProfile.fetching,
  profile: state.userProfile.profile,
  posting: state.userProfile.posting,
});

const actions = {
  getUserProfile: getProfile,
  sendQuestion: postQuestion,
  hideQuestion: removeQuestion,
};

export default connect(mapStateToProps, actions)(ProfilePage);
