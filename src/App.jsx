import React from 'react';

import Form from './components/Form';
import TodoList from './components/TodoList';
import Header from './components/Header';

function App() {
  return (
    <div className="container">
      <Header />
      <Form />
      <TodoList />
    </div>
  );
}

export default App;
