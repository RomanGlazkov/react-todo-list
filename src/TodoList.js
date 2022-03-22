import React from 'react';

class ListItem extends React.Component {
	handleEdit = (id, event) => {
		const todoSpan = event.target;
		const todoText = todoSpan.textContent;
		const form = document.createElement('form');
		const input = document.createElement('input');

		input.value = todoText;

		form.appendChild(input);
		todoSpan.innerHTML = '';
		todoSpan.appendChild(form);
		input.focus();

		const handleSubmit = () => {
			if (input.value !== todoText) {
				this.props.editTodo(id, input.value);
			} else {
				todoSpan.innerHTML = input.value;
			}
		};

		form.onsubmit = (event) => {
			event.preventDefault();
			input.removeEventListener('blur', handleSubmit);
			handleSubmit();
		};

		input.addEventListener('blur', handleSubmit);
	};

	render() {
		let todos = this.props.todosData;

		if (todos.length === 0 && this.props.displayedTodos === 'all') {
			return <p>Nothing to do! Add a task?</p>;
		}

		todos = todos.map((todo) => {
			return (
				<li className="todo-list__item" key={todo.id}>
					<input
						type="checkbox"
						onChange={() => this.props.toggleTodo(todo.id)}
						checked={todo.complete ? true : false}
					/>
					<span
						className={'editable ' + (todo.complete ? 'complete' : '')}
						onDoubleClick={(event) => this.handleEdit(todo.id, event)}
					>
						{todo.text}
					</span>
					<button className="delete-btn" onClick={() => this.props.deleteTodo(todo.id)}>
						Delete
					</button>
				</li>
			);
		});

		return (
			<div>
				<TasksInfo
					selectAll={this.props.selectAll}
					activeTodoCount={this.props.activeTodoCount}
					displayedTodos={this.props.displayedTodos}
					filterDisplayedTodos={this.props.filterDisplayedTodos}
				/>
				{todos}
				{this.props.completedTodoCount > 0 && (
					<div className="clear-completed">
						<button className="clear-completed__btn" onClick={this.props.clearCompletedTodos}>
							Clear completed tasks
						</button>
					</div>
				)}
			</div>
		);
	}
}

class TasksInfo extends React.Component {
	render() {
		const { selectAll, activeTodoCount, displayedTodos, filterDisplayedTodos } = this.props;

		return (
			<div className="tasks-info">
				<div className="select-all">
					<input
						type="checkbox"
						id="select-all"
						onChange={(event) => selectAll(event)}
						checked={activeTodoCount === 0}
					/>
					<label htmlFor="select-all">Select All</label>
				</div>
				<div>
					<b>{activeTodoCount}</b> tasks left
				</div>
				<ul className="filters" onClick={(event) => filterDisplayedTodos(event)}>
					<li className={'filter-elem ' + (displayedTodos === 'all' ? 'selected' : '')}>All</li>
					<li className={'filter-elem ' + (displayedTodos === 'active' ? 'selected' : '')}>
						Active
					</li>
					<li className={'filter-elem ' + (displayedTodos === 'completed' ? 'selected' : '')}>
						Completed
					</li>
				</ul>
			</div>
		);
	}
}

class TodoList extends React.Component {
	render() {
		const {
			todosData,
			displayedTodos,
			deleteTodo,
			editTodo,
			toggleTodo,
			selectAll,
			activeTodoCount,
			completedTodoCount,
			filterDisplayedTodos,
			clearCompletedTodos,
		} = this.props;

		const todos = todosData.filter((todo) => {
			switch (displayedTodos) {
				case 'active':
					return !todo.complete;
				case 'completed':
					return todo.complete;
				default:
					return true;
			}
		});

		return (
			<ul className="todo-list">
				<ListItem
					todosData={todos}
					displayedTodos={displayedTodos}
					deleteTodo={deleteTodo}
					editTodo={editTodo}
					toggleTodo={toggleTodo}
					selectAll={selectAll}
					activeTodoCount={activeTodoCount}
					completedTodoCount={completedTodoCount}
					filterDisplayedTodos={filterDisplayedTodos}
					clearCompletedTodos={clearCompletedTodos}
				/>
			</ul>
		);
	}
}

export default TodoList;
