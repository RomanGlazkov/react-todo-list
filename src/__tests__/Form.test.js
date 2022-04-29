import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { Form } from '../components/Form';

const mockedAddTodo = jest.fn();
const mockedSetText = jest.fn();

test('Form submission should not add todo if input field is empty', () => {
  render(<Form formText="" addTodo={mockedAddTodo} setText={mockedSetText} />);

  const input = screen.getByPlaceholderText('Add todo');

  fireEvent.submit(input);

  expect(mockedAddTodo).not.toHaveBeenCalled();
});

test('Form submission should add todo', () => {
  render(<Form formText="Feed my dog" addTodo={mockedAddTodo} setText={mockedSetText} />);

  const input = screen.getByPlaceholderText('Add todo');

  fireEvent.submit(input);

  expect(mockedAddTodo).toHaveBeenCalled();
});
