import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import TasksInfo from './TasksInfo';
import TodoItem from './TodoItem';
import { clearCompletedTodos } from '../actions/todosActions';

const mapStateToProps = (state) => ({ todos: state.todos, filter: state.filter });

function TodoList({ todos, filter, clearCompletedTodos }) {
  useEffect(() => commit(todos));

  if (todos.length === 0) {
    return <p>Nothing to do! Add a task?</p>;
  }

  const activeTodoCount = todos.reduce((acc, todo) => {
    return todo.complete ? acc : acc + 1;
  }, 0);
  const completedTodoCount = todos.length - activeTodoCount;

  function commit(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  todos = todos.filter((todo) => {
    switch (filter) {
      case 'active':
        return !todo.complete;
      case 'completed':
        return todo.complete;
      default:
        return true;
    }
  });

  return (
    <div>
      <TasksInfo activeTodoCount={activeTodoCount} />
      <ul className="todo-list">
        {todos.map((todo) => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </ul>
      {completedTodoCount > 0 && (
        <div className="clear-completed">
          <button className="clear-completed__btn" onClick={() => clearCompletedTodos()}>
            Clear completed tasks
          </button>
        </div>
      )}
    </div>
  );
}

export default connect(mapStateToProps, { clearCompletedTodos })(TodoList);
