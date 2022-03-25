import React, { useState, useRef, useEffect } from 'react';

function ListItem(props) {
	const initialState = {
		todoId: null,
		taskText: '',
		isEditing: false,
	};

	const [state, setState] = useState(initialState);
	const inputRef = useRef(null);

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	});

	function handleEdit(id, text) {
		setState({
			todoId: id,
			taskText: text,
			isEditing: true,
		});
	}

	function handleChange(event) {
		const { value } = event.target;

		setState((prevState) => {
			return { ...prevState, taskText: value };
		});
	}

	function handleBlur(event, id) {
		props.editTodo(id, event.target.value);
		setState(initialState);
	}

	function handleKeyDown(event) {
		if (event.code === 'Enter') {
			event.target.blur();
		}
	}

	let todos = props.todosData;

	todos = todos.map((todo) => {
		const isEditing = state.isEditing && state.todoId === todo.id;

		return (
			<li className="todo-list__item" key={todo.id}>
				<input
					type="checkbox"
					onChange={() => props.toggleTodo(todo.id)}
					checked={todo.complete ? true : false}
				/>
				{isEditing ? (
					<input
						type="text"
						className="editable"
						value={state.taskText}
						ref={inputRef}
						onBlur={(event) => handleBlur(event, todo.id)}
						onChange={handleChange}
						onKeyDown={handleKeyDown}
					/>
				) : (
					<span
						className={'editable ' + (todo.complete ? 'complete' : '')}
						onDoubleClick={() => handleEdit(todo.id, todo.text)}
					>
						{todo.text}
					</span>
				)}
				<button className="delete-btn" onClick={() => props.deleteTodo(todo.id)}>
					Delete
				</button>
			</li>
		);
	});

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
