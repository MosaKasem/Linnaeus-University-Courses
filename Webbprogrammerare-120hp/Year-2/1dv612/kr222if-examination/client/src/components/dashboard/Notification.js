import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";

const Notification = ({ notification }) => {
  return (
    <div className="section">
      <div className="card z-depth-0">
        <div className="card-content">
          <span className="card-title">Notification</span>
          <ul className="notifications">
            {notification &&
              notification.map(notification => (
                <li key={notification.id}>
                  <span className="pink-text">{notification.user}</span>{' '}
                  <span>{notification.content}</span>
                  <div className="grey-text note-date">{moment(notification.time.toDate()).fromNow()}</div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

Notification.propTypes = {

}

export default connect(null)(Notification);
