import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = ({ title }) => {
  return <li>{title}</li>;
};

TodoItem.propTypes = {
  title: PropTypes.string.isRequired,
};

export default TodoItem;
