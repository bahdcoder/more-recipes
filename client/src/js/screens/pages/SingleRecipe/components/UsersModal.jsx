import React from 'react';
import PropTypes from 'prop-types';

/**
 * The user modal component
 * @param {obj} props users to display
 * @return {null} null
 */
const UserModal = props => ((
  <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">{props.title}</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          {
            props.loading ? (
              <div className="justify-content-center row">
                <i className="ion ion-load-c h1 loader" />
              </div>
            ) : ''
          }
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-primary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
));

UserModal.propTypes = {
  loading: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired
};

export default UserModal;
