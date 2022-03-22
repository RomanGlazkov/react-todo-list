import React from 'react';
import Form from './Form';
import TodoList from './TodoList';

class App extends React.Component {
	state = {
		todos: JSON.parse(localStorage.getItem('todos')) || [],
		displayedTodos: 'all',
	};

	commit(todos) {
		localStorage.setItem('todos', JSON.stringify(todos));
	}

	addTodo = (text) => {
		const { todos } = this.state;
		const id = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
		const newTodo = {
			id,
			text,
			complete: false,
		};

		this.setState({
			todos: [...todos, newTodo],
		});
	};

	deleteTodo = (id) => {
		const { todos } = this.state;

		this.setState({
			todos: todos.filter((todo) => todo.id !== id),
		});
	};

	editTodo = (id, updatedText) => {
		const { todos } = this.state;

		this.setState({
			todos: todos.map((todo) => {
				if (todo.id === id) {
					return {
						id: todo.id,
						text: updatedText,
						complete: todo.complete,
					};
				}

				return todo;
			}),
		});
	};

	toggleTodo = (id) => {
		const { todos } = this.state;

		this.setState({
			todos: todos.map((todo) => {
				if (todo.id === id) {
					return {
						id: todo.id,
						text: todo.text,
						complete: !todo.complete,
					};
				}

				return todo;
			}),
		});
	};

	selectAll = (event) => {
		const checked = event.target.checked;
		const { todos } = this.state;

		this.setState({
			todos: todos.map((todo) => {
				return Object.assign({}, todo, { complete: checked });
			}),
		});
	};

	filterDisplayedTodos = (event) => {
		const elem = event.target;

		if (elem.classList.contains('filter-elem')) {
			const filter = elem.textContent.toLowerCase();

			this.setState({
				displayedTodos: filter,
			});
		}
	};

	clearCompletedTodos = () => {
		const { todos } = this.state;

		this.setState({
			todos: todos.filter((todo) => todo.complete !== true),
		});
	};

	render() {
		const activeTodoCount = this.state.todos.reduce((acc, todo) => {
			return todo.complete ? acc : acc + 1;
		}, 0);

		const completedTodoCount = this.state.todos.length - activeTodoCount;

		this.commit(this.state.todos);

		return (
			<div className="container">
				<h1>Todos</h1>
				<Form addTodo={this.addTodo} />
				<TodoList
					todosData={this.state.todos}
					displayedTodos={this.state.displayedTodos}
					editTodo={this.editTodo}
					deleteTodo={this.deleteTodo}
					toggleTodo={this.toggleTodo}
					selectAll={this.selectAll}
					activeTodoCount={activeTodoCount}
					completedTodoCount={completedTodoCount}
					filterDisplayedTodos={this.filterDisplayedTodos}
					clearCompletedTodos={this.clearCompletedTodos}
				/>
			</div>
		);
	}
}

export default App;
