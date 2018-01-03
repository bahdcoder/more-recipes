import PropTypes from 'prop-types';

const recipePropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  timeToCook: PropTypes.number.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  procedure: PropTypes.arrayOf(PropTypes.string).isRequired,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  User: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    about: PropTypes.string,
    settings: PropTypes.shape({
      reviewEmails: PropTypes.number.isRequired,
      favoriteModifiedEmail: PropTypes.number.isRequired
    }).isRequired,
  }).isRequired,
  upvotersIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  downvotersIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  favoritersIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  viewers: PropTypes.arrayOf(PropTypes.string).isRequired,
}).isRequired;

export default recipePropTypes;
