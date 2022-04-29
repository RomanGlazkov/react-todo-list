import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from '../App';
import rootReducer from '../reducers';

export const renderWithRedux = (
  component,
  { initialState, store = createStore(rootReducer, initialState) } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

test('renders the correct initial DOM', () => {
  renderWithRedux(<App />);

  const h1 = screen.getByText(/todos/i);
  const input = screen.getByPlaceholderText('Add todo');
  const emptyTaskList = screen.getByText(/nothing to do/i);

  expect(h1).toHaveTextContent('Todos');
  expect(input.getAttribute('value')).toBe('');
  expect(emptyTaskList).toBeInTheDocument();
});
