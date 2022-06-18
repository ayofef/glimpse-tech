import React from 'react';
import TodoItem from './TodoItem';
import { TODO_PROP_TYPES } from '../../constants/todos-prop-types';

const Todos = ({ todos }) => {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} title={todo.title} />
      ))}
    </ul>
  );
};

Todos.propTypes = {
  todos: TODO_PROP_TYPES.isRequired,
};

export default Todos;
