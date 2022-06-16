import { csrfFetch } from "./csrf.js";

// Actions
const GET_USERS = "users/GET_USERS";

// Action Creators
const getUsers = (users) => {
  return {
    type: GET_USERS,
    payload: users,
  };
};

// Thunks
export const getUsersThunk = () => async (dispatch) => {
  const res = await fetch("/api/users");

  if (res.ok) {
    const allUsers = await res.json();
    dispatch(getUsers(allUsers));
  }
};

// Reducer
const initialState = {};

export default function usersReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_USERS:
      newState = {};
      action.payload.forEach((user) => {
        newState[user.id] = user;
      });
      return newState;
    default:
      return state;
  }
}
