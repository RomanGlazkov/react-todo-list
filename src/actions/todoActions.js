export const SET_STATE = 'SET_STATE';
export const RESET_STATE = 'RESET_STATE';

export const setState = (state) => ({
  type: SET_STATE,
  payload: state,
});

export const resetState = () => ({
  type: RESET_STATE,
});
