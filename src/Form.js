import React, { useState } from 'react';

function Form(props) {
	const initialState = '';
	const [text, setText] = useState(initialState);

	function submitForm(event) {
		event.preventDefault();
		if (text !== '') {
			props.addTodo(text);
			setText(initialState);
		}
	}

	function handleChange(event) {
		const { value } = event.target;

		setText(value);
	}

	return (
		<form onSubmit={submitForm}>
			<input type="text" placeholder="Add todo" name="todo" value={text} onChange={handleChange} />
		</form>
	);
}

export default Form;
