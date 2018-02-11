import PropTypes from 'prop-types';

const recipePropTypes = PropTypes.shape({
  id: PropTypes.string,
  title: PropTypes.string,
  userId: PropTypes.string,
  description: PropTypes.string,
  imageUrl: PropTypes.string,
  timeToCook: PropTypes.number,
  ingredients: PropTypes.string,
  procedure: PropTypes.string,
  createdAt: PropTypes.string,
  updatedAt: PropTypes.string,
  User: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    about: PropTypes.string,
    settings: PropTypes.string,
  }),
  upvotersIds: PropTypes.arrayOf(PropTypes.string),
  downvotersIds: PropTypes.arrayOf(PropTypes.string),
  favoritersIds: PropTypes.arrayOf(PropTypes.string),
  viewers: PropTypes.arrayOf(PropTypes.string),
});

export default recipePropTypes;
