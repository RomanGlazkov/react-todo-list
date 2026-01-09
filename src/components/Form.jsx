import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actions/todosActions';
import { setText } from '../actions/formActions';

const mapStateToProps = (state) => ({ formText: state.formText });

export function Form({ formText, addTodo, setText }) {
  function submitForm(event) {
    event.preventDefault();
    if (formText.trim() !== '') {
      addTodo(formText);
      setText();
    }
  }

  function handleChange(event) {
    const { value } = event.target;

    setText(value);
  }

  return (
    <form onSubmit={submitForm}>
      <input
        type="text"
        className="add-todo"
        placeholder="Add todo"
        name="todo"
        value={formText}
        onChange={handleChange}
      />
    </form>
  );
}

export default connect(mapStateToProps, { addTodo, setText })(Form);
