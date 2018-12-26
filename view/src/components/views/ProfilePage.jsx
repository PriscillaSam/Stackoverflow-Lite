import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavBar from '../containers/NavBar';
import Button from '../button';
import Footer from '../containers/Footer';
import QuestionCard from '../containers/QuestionCard';
import isLoggedIn from '../../utilities/auth';
import { getProfile } from '../../actions/profileActions';

class ProfilePage extends Component {
  state = {}

  componentDidMount() {
    const { getUserProfile } = this.props;
    getUserProfile();
  }

  render() {
    const loggedIn = isLoggedIn();
    if (!loggedIn) {
      return <Redirect to="/" />;
    }
    const { profile } = this.props;
    return (
      <div className="bg-light pos-rel">
        <div className="pos-rel" id="wrap">
          <NavBar isLoggedIn={loggedIn} />
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
                      profile && profile.most_answered.length > 0
                        ? profile.most_answered.map(question => (
                          <QuestionCard
                            question={question}
                            key={question.id}
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
                  <form id="question-form">
                    <div className="input-area">
                      <textarea
                        name=""
                        cols="30"
                        rows="10"
                        className="form-input"
                        placeholder="type your question here..."
                        required
                      />
                    </div>
                    <div className="input-area right">
                      <button
                        type="submit"
                        className="btn btn-success"
                        id="question-btn"
                      >
                        <span className="hidden spinner">
                          <i className="fas fa-spin fa-spinner fa-lg fa-fw" />
                        </span>
                        <span className="btnText">
                          <i className="fas fa-share fa-fw" />
                          Post Question
                        </span>
                      </button>
                    </div>
                  </form>
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

ProfilePage.propTypes = {
  getUserProfile: PropTypes.func.isRequired,
  profile: PropTypes.object,
};

ProfilePage.defaultProps = {
  profile: {},
};

const mapStateToProps = state => (
  {
    fetching: state.userProfile.fetching,
    profile: state.userProfile.profile,
  }
);

const actions = {
  getUserProfile: getProfile,
};

export default connect(mapStateToProps, actions)(ProfilePage);
