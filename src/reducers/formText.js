import { SET_TEXT } from '../actions/formActions';

export default function formText(state = '', action) {
  switch (action.type) {
    case SET_TEXT:
      return action.payload;
    default:
      return state;
  }
}
