import React, { useState, useEffect } from 'react';
import Form from './Form';
import TodoList from './TodoList';
import Header from './Header';

function App() {
	const initialTodos = JSON.parse(localStorage.getItem('todos')) || [];

	const [todos, setTodos] = useState(initialTodos);
	const [displayedTodos, setDisplayedTodos] = useState('all');

	const activeTodoCount = todos.reduce((acc, todo) => {
		return todo.complete ? acc : acc + 1;
	}, 0);
	const completedTodoCount = todos.length - activeTodoCount;

	useEffect(() => commit(todos));

	function commit(todos) {
		localStorage.setItem('todos', JSON.stringify(todos));
	}

	function addTodo(text) {
		const id = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
		const newTodo = {
			id,
			text,
			complete: false,
		};

		setTodos((prevTodos) => {
			return [...prevTodos, newTodo];
		});
	}

	function deleteTodo(id) {
		setTodos((prevTodos) => {
			return prevTodos.filter((todo) => todo.id !== id);
		});
	}

	function editTodo(id, updatedText) {
		setTodos((prevTodos) => {
			return prevTodos.map((todo) => {
				if (todo.id === id) {
					return {
						id: todo.id,
						text: updatedText,
						complete: todo.complete,
					};
				}

				return todo;
			});
		});
	}

	function toggleTodo(id) {
		setTodos((prevTodos) => {
			return prevTodos.map((todo) => {
				if (todo.id === id) {
					return {
						id: todo.id,
						text: todo.text,
						complete: !todo.complete,
					};
				}

				return todo;
			});
		});
	}

	function selectAll(event) {
		const checked = event.target.checked;

		setTodos((prevTodos) => {
			return prevTodos.map((todo) => {
				return Object.assign({}, todo, { complete: checked });
			});
		});
	}

	function filterDisplayedTodos(event) {
		const elem = event.target.closest('li');

		if (elem) {
			const filter = elem.dataset.filterType;

			setDisplayedTodos(filter);
		}
	}

	function clearCompletedTodos() {
		setTodos((prevTodos) => {
			return prevTodos.filter((todo) => todo.complete !== true);
		});
	}

	return (
		<div className="container">
			<Header />
			<Form addTodo={addTodo} />
			<TodoList
				todosData={todos}
				displayedTodos={displayedTodos}
				editTodo={editTodo}
				deleteTodo={deleteTodo}
				toggleTodo={toggleTodo}
				selectAll={selectAll}
				activeTodoCount={activeTodoCount}
				completedTodoCount={completedTodoCount}
				filterDisplayedTodos={filterDisplayedTodos}
				clearCompletedTodos={clearCompletedTodos}
			/>
		</div>
	);
}

export default App;
