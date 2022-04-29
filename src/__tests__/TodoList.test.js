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
    {
      id: 2,
      text: 'Learn Jest',
      complete: false,
    },
  ],
};

test('Should select all uncompleted tasks', () => {
  renderWithRedux(<TodoList />, {
    initialState,
  });

  const todoCount = screen.getByTestId('todoCount');
  const selectAllInput = screen.getByTestId('selectAll');

  expect(todoCount).toHaveTextContent('2 tasks left');

  fireEvent.click(selectAllInput);

  expect(todoCount).toHaveTextContent('0 tasks left');

  fireEvent.click(selectAllInput);

  expect(todoCount).toHaveTextContent('2 tasks left');
});

test('Should select all tasks', () => {
  initialState.todos.push({
    id: 3,
    text: 'Relax',
    complete: true,
  });

  renderWithRedux(<TodoList />, {
    initialState,
  });

  const todoCount = screen.getByTestId('todoCount');
  const selectAllInput = screen.getByTestId('selectAll');

  expect(todoCount).toHaveTextContent('2 tasks left');

  fireEvent.click(selectAllInput);

  expect(todoCount).toHaveTextContent('0 tasks left');

  fireEvent.click(selectAllInput);

  expect(todoCount).toHaveTextContent('3 tasks left');
});

test('Should display only active tasks', () => {
  renderWithRedux(<TodoList />, {
    initialState,
  });

  const activeLink = screen.getByText('Active');

  fireEvent.click(activeLink);

  const todos = screen.queryAllByTestId('todo');

  expect(todos.length).toBe(2);
});

test('Should display only completed tasks', () => {
  renderWithRedux(<TodoList />, {
    initialState,
  });

  const completedLink = screen.getByText('Completed');

  fireEvent.click(completedLink);

  const todos = screen.queryAllByTestId('todo');

  expect(todos.length).toBe(1);
});

test('It clears completed todos', () => {
  renderWithRedux(<TodoList />, {
    initialState: {
      todos: initialState.todos.map((todo) => {
        return { ...todo, complete: true };
      }),
    },
  });

  const clearButton = screen.queryByTestId('clearButton');

  expect(clearButton).toBeInTheDocument();

  fireEvent.click(clearButton);

  const emptyTaskList = screen.getByText(/nothing to do/i);
  const todos = screen.queryAllByTestId('todo');

  expect(todos.length).toBe(0);
  expect(emptyTaskList).toBeInTheDocument();
});
