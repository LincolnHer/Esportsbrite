// Actions
const GET_USER_EVENTS = "events/GET_USER_EVENTS";

// Action Creators
const getUserEvents = (events) => {
  return {
    type: GET_USER_EVENTS,
    payload: events,
  };
};

// Thunks
export const getUserEventsThunk = (userId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}/events`);

  if (res.ok) {
    const userEvents = await res.json();
    dispatch(getUserEvents(userEvents));
  }
};

// Reducer
const initialState = {};

export default function userEventsReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_USER_EVENTS:
      newState = {};
      action.payload.forEach((event) => {
        newState[event.id] = event;
      });
      return newState;
    default:
        return state;
  }
}
