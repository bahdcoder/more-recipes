import Noty from 'noty';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/**
 * Notification component
 * @param {object} notification notification
 * @returns {jsx} component jsx
 */
const Notification = ({ notification }) => {
  if (notification && notification.message) {
    new Noty({
      text: notification.message,
      type: 'success',
      theme: 'bootstrap-v4',
      timeout: 2000
    }).show();
  }
  return <div />;
};

Notification.propTypes = {
  notification: PropTypes.shape({
    level: PropTypes.string,
    message: PropTypes.string
  }).isRequired
};

const mapStateToProps = state => ({ notification: state.notification });

const NotificationContainer = connect(mapStateToProps, null)(Notification);

export default NotificationContainer;
