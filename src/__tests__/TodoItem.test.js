import React from 'react';
import { screen, fireEvent } from '@testing-library/react';

import TodoList from '../components/TodoList';
import { renderWithRedux } from './App.test';

const initialState = {
  todos: [
    {
      id: 1,
      text: 'Feed my dog',
      complete: false,
    },
  ],
};

test('It deletes a todo', () => {
  renderWithRedux(<TodoList />, {
    initialState,
  });

  const newTodo = screen.getByText('Feed my dog');
  const deleteBtn = screen.getByText(/delete/i);

  fireEvent.click(deleteBtn);

  const emptyTaskList = screen.getByText(/nothing to do/i);
  const todos = screen.queryAllByTestId('todo');

  expect(newTodo).not.toBeInTheDocument();
  expect(emptyTaskList).toBeInTheDocument();
  expect(todos.length).toBe(0);
});

test('It changes a todo', () => {
  renderWithRedux(<TodoList />, {
    initialState,
  });

  let newTodo = screen.getByTestId('todoText');

  fireEvent.doubleClick(newTodo);

  const todoInput = screen.getByTestId('todoInput');

  fireEvent.change(todoInput, { target: { value: 'Learn React' } });
  fireEvent.blur(todoInput);

  newTodo = screen.getByTestId('todoText');

  expect(newTodo).toHaveTextContent('Learn React');
});

test('It completes a todo', () => {
  const { store } = renderWithRedux(<TodoList />, {
    initialState,
  });

  let clearButton = screen.queryByTestId('clearButton');
  const todoCheckbox = screen.getByTestId('todoCheckbox');

  expect(clearButton).not.toBeInTheDocument();

  fireEvent.click(todoCheckbox);

  clearButton = screen.queryByTestId('clearButton');

  const todo = store.getState().todos[0];

  expect(clearButton).toBeInTheDocument();
  expect(todo.complete).toBe(true);
});
