import { combineReducers } from 'redux';
import todos from './todos';
import todo from './todo';
import formText from './formText';
import filter from './filter';

const rootReducer = combineReducers({
  todos,
  todo,
  formText,
  filter,
});

export default rootReducer;
