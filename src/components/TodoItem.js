import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { editTodo, toggleTodo, deleteTodo } from '../actions/todosActions';
import { setState, resetState } from '../actions/todoActions';

const mapStateToProps = (state) => ({ todoState: state.todo });

const actionCreators = {
  editTodo,
  toggleTodo,
  deleteTodo,
  setState,
  resetState,
};

function TodoItem(props) {
  const { todoState, id, text, complete, editTodo, toggleTodo, deleteTodo, setState, resetState } =
    props;
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  function handleEdit(id, text) {
    setState({
      id,
      taskText: text,
      isEditing: true,
    });
  }

  function handleChange(event) {
    const { value } = event.target;

    setState({ taskText: value });
  }

  function handleBlur(event, id) {
    editTodo(id, event.target.value);
    resetState();
  }

  function handleKeyDown(event) {
    if (event.code === 'Enter') {
      event.target.blur();
    }
  }

  const isEditing = todoState.isEditing && todoState.id === id;

  return (
    <li className="todo-list__item">
      <input type="checkbox" onChange={() => toggleTodo(id)} checked={complete ? true : false} />
      {isEditing ? (
        <input
          type="text"
          className="editable"
          value={todoState.taskText}
          ref={inputRef}
          onBlur={(event) => handleBlur(event, id)}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <span
          className={'editable' + (complete ? ' complete' : '')}
          onDoubleClick={() => handleEdit(id, text)}
        >
          {text}
        </span>
      )}
      <button className="delete-btn" onClick={() => deleteTodo(id)}>
        Delete
      </button>
    </li>
  );
}

export default connect(mapStateToProps, actionCreators)(TodoItem);
