const ADD_TODO = 'ADD_TODO';
const DELETE_TODO = 'DELETE_TODO';
const EDIT_TODO = 'EDIT_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const SELECT_ALL = 'SELECT_ALL';
const CLEAR_COMPLETED_TODOS = 'CLEAR_COMPLETED_TODOS';

export const actions = {
  ADD_TODO,
  DELETE_TODO,
  EDIT_TODO,
  TOGGLE_TODO,
  SELECT_ALL,
  CLEAR_COMPLETED_TODOS,
};

export const addTodo = (text) => ({
  type: ADD_TODO,
  payload: text,
});

export const deleteTodo = (id) => ({
  type: DELETE_TODO,
  payload: id,
});

export const editTodo = (id, updatedText) => ({
  type: EDIT_TODO,
  payload: {
    id,
    updatedText,
  },
});

export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  payload: id,
});

export const selectAll = (event) => ({
  type: SELECT_ALL,
  payload: event,
});

export const clearCompletedTodos = () => ({
  type: CLEAR_COMPLETED_TODOS,
});
