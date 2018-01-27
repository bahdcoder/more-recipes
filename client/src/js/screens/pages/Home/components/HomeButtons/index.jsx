import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const HomeButtons = ({ isAuthenticated, authUser }) => ((
  <span>
    {
      !isAuthenticated &&
      <span>
        <Link
          to="/auth/login"
          className="btn btn-primary btn-lg mr-2"
          role="button"
        >
          Sign in
        </Link>
        <Link
          to="/auth/register"
          className="btn btn-primary btn-lg"
          role="button"
        >
          Join now
        </Link>
      </span>
    }
    {
      isAuthenticated &&
      <span>
        <Link to="/recipes/create" className="btn btn-primary btn-lg mr-2">
          Create recipe
        </Link>
        <Link
          to={`user/${authUser.user.id}/recipes`}
          className="btn btn-primary btn-lg"
        >
          Manage your recipes
        </Link>
      </span>
    }
  </span>
));

HomeButtons.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  authUser: PropTypes.shape({
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      about: PropTypes.string
    }),
    access_token: PropTypes.string.isRequired
  })
};

HomeButtons.defaultProps = {
  authUser: null
};

export default HomeButtons;
