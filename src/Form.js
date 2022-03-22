import React from 'react';

class Form extends React.Component {
	initialState = {
		text: '',
	};

	state = this.initialState;

	handleChange = (event) => {
		const { value } = event.target;

		this.setState({
			text: value,
		});
	};

	submitForm = (event) => {
		event.preventDefault();
		if (this.state.text !== '') {
			this.props.addTodo(this.state.text);
			this.setState(this.initialState);
		}
	};

	render() {
		const { text } = this.state;

		return (
			<form onSubmit={this.submitForm}>
				<input
					type="text"
					placeholder="Add todo"
					name="todo"
					value={text}
					onChange={this.handleChange}
				/>
			</form>
		);
	}
}

export default Form;
