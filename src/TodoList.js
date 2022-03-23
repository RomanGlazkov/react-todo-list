import React from 'react';

function ListItem(props) {
	let todos = props.todosData;

	todos = todos.map((todo) => {
		return (
			<li className="todo-list__item" key={todo.id}>
				<input
					type="checkbox"
					onChange={() => props.toggleTodo(todo.id)}
					checked={todo.complete ? true : false}
				/>
				<span
					className={'editable ' + (todo.complete ? 'complete' : '')}
					onDoubleClick={(event) => handleEdit(todo.id, event)}
				>
					{todo.text}
				</span>
				<button className="delete-btn" onClick={() => props.deleteTodo(todo.id)}>
					Delete
				</button>
			</li>
		);
	});

	function handleEdit(id, event) {
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
				props.editTodo(id, input.value);
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
	}

	return todos;
}

function TasksInfo(props) {
	const { selectAll, activeTodoCount, displayedTodos, filterDisplayedTodos } = props;

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
				<li
					className={'filter-elem' + (displayedTodos === 'all' ? ' selected' : '')}
					data-filter-type="all"
				>
					All
				</li>
				<li
					className={'filter-elem' + (displayedTodos === 'active' ? ' selected' : '')}
					data-filter-type="active"
				>
					Active
				</li>
				<li
					className={'filter-elem' + (displayedTodos === 'completed' ? ' selected' : '')}
					data-filter-type="completed"
				>
					Completed
				</li>
			</ul>
		</div>
	);
}

function TodoList(props) {
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
	} = props;

	if (todosData.length === 0 && displayedTodos === 'all') {
		return <p>Nothing to do! Add a task?</p>;
	}

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
		<div>
			<TasksInfo
				selectAll={selectAll}
				activeTodoCount={activeTodoCount}
				displayedTodos={displayedTodos}
				filterDisplayedTodos={filterDisplayedTodos}
			/>
			<ul className="todo-list">
				<ListItem
					todosData={todos}
					deleteTodo={deleteTodo}
					editTodo={editTodo}
					toggleTodo={toggleTodo}
				/>
			</ul>
			{completedTodoCount > 0 && (
				<div className="clear-completed">
					<button className="clear-completed__btn" onClick={clearCompletedTodos}>
						Clear completed tasks
					</button>
				</div>
			)}
		</div>
	);
}

export default TodoList;
