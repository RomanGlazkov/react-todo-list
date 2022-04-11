import { actions } from '../actions/todosActions';

const initialTodos = JSON.parse(localStorage.getItem('todos')) || [];

export default function todos(todos = initialTodos, action) {
  switch (action.type) {
    case actions.ADD_TODO:
      const id = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
      const newTodo = {
        id,
        text: action.payload,
        complete: false,
      };

      return [...todos, newTodo];
    case actions.DELETE_TODO:
      return todos.filter((todo) => todo.id !== action.payload);
    case actions.EDIT_TODO:
      return todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            text: action.payload.updatedText,
          };
        }

        return todo;
      });
    case actions.TOGGLE_TODO:
      return todos.map((todo) => {
        if (todo.id === action.payload) {
          return {
            ...todo,
            complete: !todo.complete,
          };
        }

        return todo;
      });
    case actions.SELECT_ALL:
      const event = action.payload;
      const checked = event.target.checked;

      return todos.map((todo) => {
        return Object.assign({}, todo, { complete: checked });
      });
    case actions.CLEAR_COMPLETED_TODOS:
      return todos.filter((todo) => todo.complete !== true);
    default:
      return todos;
  }
}
