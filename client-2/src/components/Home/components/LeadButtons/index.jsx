import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SignedOutLeadButtons = () => (
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
);

const SignedInLeadButtons = () => (
  <span>
    <Link
      to="/recipes/create"
      className="btn btn-primary btn-lg mr-2"
      role="button"
    >
        Create recipe
    </Link>
    <Link
      to="/user/recipes"
      className="btn btn-primary btn-lg"
      role="button"
    >
        Manage your recipes
    </Link>
  </span>
);

const LeadButtons = ({ isAuthenticated }) => (
  <span>
    { isAuthenticated &&
      <SignedInLeadButtons />
    }
    { !isAuthenticated &&
      <SignedOutLeadButtons />
    }
  </span>
);

LeadButtons.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

export default LeadButtons;
