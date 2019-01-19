import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { cleanUp } from '../../actions/notificationActions';

class NotifyBox extends Component {
  state = {}

  hideAlertBox = () => {
    const { reset } = this.props;
    setTimeout(reset, 5000);
  }

  render() {
    const {
      sending, error, message,
    } = this.props;

    this.hideAlertBox();
    const theme = error ? 'danger' : 'success';
    return (
      sending
      && (
        <div className={`bg-${theme} notification-box fadeIn`}>
          <div className="notification-content">
            <p className="text-center text-white notification-text">
              {message}
            </p>
          </div>
          <div className="notification-animator" />
        </div>
      )
    );
  }
}


NotifyBox.propTypes = {
  reset: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
  sending: PropTypes.bool.isRequired,
  message: PropTypes.string,
};

NotifyBox.defaultProps = {
  message: '',
};

const mapStateToProps = state => ({
  sending: state.notifications.sending,
  error: state.notifications.error,
  success: state.notifications.success,
  message: state.notifications.message,
});

const actions = {
  reset: cleanUp,
};

export default connect(mapStateToProps, actions)(NotifyBox);
