import { SET_STATE, RESET_STATE } from '../actions/todoActions';

const initialState = {
  id: null,
  taskText: '',
  isEditing: false,
};

export default function todo(state = initialState, action) {
  switch (action.type) {
    case SET_STATE:
      return { ...state, ...action.payload };
    case RESET_STATE:
      return { ...initialState };
    default:
      return state;
  }
}
