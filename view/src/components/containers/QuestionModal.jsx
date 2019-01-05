import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { postQuestion, cleanUp } from '../../actions/postQuestionActions';
import AlertBox from '../alertBox';

class QuestionModal extends Component {
  state = {
    question: '',
  }

  componentWillUnmount() {
    const { resetAction } = this.props;
    resetAction();
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  submitForm = (event) => {
    event.preventDefault();
    const { sendQuestion } = this.props;
    const { question } = this.state;
    sendQuestion(question);
  }

  render() {
    const { hideModal, sent, sending } = this.props;

    if (sent) {
      return <Redirect to="/questions" />;
    }

    return (
      <div className="modal" id="question-modal">
        <div className="modal-body slideInUp confirmBox p-2">
          <button
            type="button"
            className="btn close cl-modal"
            onClick={hideModal}
            data-testid="hide-btn"
          >
            <span>&times;</span>
          </button>
          <section className="">
            <h4 className="display-4 text-primary mb-0 fadeIn">
              <i className="fa fa-edit fa-fw" />
              <strong>Ask a question</strong>
            </h4>
            <p className="text-md mt-0">
              Be descriptive. Be concise. Be clear.
            </p>
            <form data-testid="question-form" onSubmit={this.submitForm}>
              <div className="input-area">
                <textarea
                  name="question"
                  data-testid="question-input"
                  cols="30"
                  rows="10"
                  className="form-input"
                  placeholder="type your question here..."
                  onChange={this.handleInputChange}
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
                    sending
                    && (
                      <span className="spinner">
                        <i className="fa fa-spin fa-spinner fa-lg fa-fw" />
                      </span>
                    )
                  }
                  <span className="btnText">
                    {
                      !sending
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
          </section>
        </div>
      </div>
    );
  }
}

QuestionModal.propTypes = {
  hideModal: PropTypes.func.isRequired,
  sendQuestion: PropTypes.func.isRequired,
  sent: PropTypes.bool.isRequired,
  resetAction: PropTypes.func.isRequired,
  sending: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  sending: state.postQuestion.sending,
  sent: state.postQuestion.sent,
  error: state.postQuestion.error,
});

const actions = {
  sendQuestion: postQuestion,
  resetAction: cleanUp,
};

export default connect(mapStateToProps, actions)(QuestionModal);
