import { csrfFetch } from "./csrf.js";

// Actions
const GET_EVENTS = "events/GET_EVENTS";
const GET_EVENT = "events/GET_EVENT";
const GET_USER_EVENTS = "events/GET_USER_EVENTS";
const POST_EVENT = "events/POST_EVENT";
const PUT_EVENT = "events/PUT_EVENT";
const DELETE_EVENT = "events/DELETE_EVENT";

// Action Creators
const getEvents = (events) => {
  return {
    type: GET_EVENTS,
    payload: events,
  };
};

const getEvent = (eventId) => {
  return {
    type: GET_EVENT,
    payload: eventId,
  };
};

const getUserEvents = (events) => {
  return {
    type: GET_USER_EVENTS,
    payload: events,
  };
};

const postEvent = (event) => {
  return {
    type: POST_EVENT,
    payload: event,
  };
};

const putEvent = (event) => {
  return {
    type: PUT_EVENT,
    payload: event,
  };
};

const deleteEvent = (event) => {
  return {
    type: DELETE_EVENT,
    payload: event,
  };
};

// Thunks
export const getEventsThunk = () => async (dispatch) => {
  const res = await fetch("/api/events");

  if (res.ok) {
    const allEvents = await res.json();
    dispatch(getEvents(allEvents));
  }
};

export const getEventThunk = (eventId) => async (dispatch) => {
  const res = await fetch(`/api/events/${eventId}`);

  if (res.ok) {
    const singleEvent = await res.json();
    dispatch(getEvent(singleEvent));
  }
};

export const getUserEventsThunk = (userId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}/events`);

  if (res.ok) {
    const userEvents = await res.json();
    dispatch(getUserEvents(userEvents));
  }
};

export const postEventThunk = (event) => async (dispatch) => {
  const res = await csrfFetch("/api/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  });

  if (res.ok) {
    const newEvent = await res.json();
    dispatch(postEvent(newEvent));
  }
};

export const putEventThunk = (event, eventId) => async (dispatch) => {
  const res = await csrfFetch(`/api/events/${eventId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  });

  if (res.ok) {
    const updatedEvent = await res.json();
    dispatch(putEvent(updatedEvent));
  }
};

export const deleteEventThunk = (event) => async (dispatch) => {
  const res = await csrfFetch(`/api/events/${event.id}`, {
    method: "DELETE",
  });

  if (res.ok) {
    // const events = await res.json()
    dispatch(deleteEvent(event));
  }
};

// Reducer
const initialState = { userEvents: {} };

export default function eventsReducer(state = initialState, action) {
  let newState;
  let userEvents;
  switch (action.type) {
    case GET_EVENTS:
      newState = {};
      action.payload.forEach((event) => {
        newState[event.id] = event;
      });
      return newState;
    case GET_EVENT:
      newState = { ...state, event: action.payload };
      return newState;
    case GET_USER_EVENTS:
      newState = { ...state };
      userEvents = {};
      action.payload.forEach((event) => {
        userEvents[event.id] = event;
      });
      newState.userEvents = userEvents;
      return newState;
    case POST_EVENT:
      newState = { ...state, [action.payload.id]: action.payload };
      return newState;
    case PUT_EVENT:
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState
    case DELETE_EVENT:
      newState = { ...state };
      delete newState[action.payload.id];
      return newState;
    default:
      return state;
  }
}
