import PropTypes from 'prop-types';

export const TODO_PROP_TYPES = PropTypes.arrayOf(
  PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.number,
    completed: PropTypes.bool,
  })
);
