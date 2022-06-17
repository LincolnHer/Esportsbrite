import { csrfFetch } from "./csrf.js";

// Actions
const GET_TICKETS = "tickets/GET_TICKETS";
const GET_TICKET = "tickets/GET_TICKET";
const POST_TICKET = "tickets/POST_TICKET";
const PUT_TICKET = "tickets/PUT_TICKET";
const DELETE_TICKET = "tickets/DELETE_TICKET";

// Action Creators
const getTickets = (ticket) => {
  return {
    type: GET_TICKETS,
    payload: ticket,
  };
};

const getTicket = (ticketId) => {
  return {
    type: GET_TICKET,
    payload: ticketId,
  };
};

const postTicket = (ticket) => {
  return {
    type: POST_TICKET,
    payload: ticket,
  };
};

const putTicket = (ticket) => {
  return {
    type: PUT_TICKET,
    payload: ticket,
  };
};

const deleteTicket = (ticket) => {
  return {
    type: DELETE_TICKET,
    payload: ticket,
  };
};

// Thunks
export const getTicketsThunk = (userId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}/tickets`);

  if (res.ok) {
    const tickets = await res.json();
    dispatch(getTickets(tickets));
  }
};

export const getTicketThunk = (ticketId) => async (dispatch) => {
  const res = await fetch(`/api/tickets/${ticketId}`);

  if (res.ok) {
    const singleTicket = await res.json();
    dispatch(getTicket(singleTicket));
  }
};

export const postTicketThunk = (event) => async (dispatch) => {
  const res = await csrfFetch(`/api/tickets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  });

  if (res.ok) {
    const newTicket = await res.json();
    dispatch(postTicket(newTicket));
  }
};

export const putTicketThunk = (ticket, ticketId) => async (dispatch) => {
  const res = await csrfFetch(`/api/tickets/${ticketId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ticket),
  });

  if (res.ok) {
    const updatedTicket = await res.json();
    dispatch(putTicket(updatedTicket));
  }
};

export const deleteTicketThunk = (ticket) => async (dispatch) => {
  const res = await csrfFetch(`/api/tickets/${ticket.id}`, {
    method: "DELETE",
  });

  if (res.ok) {
    const ticket = await res.json();
    dispatch(deleteTicket(ticket));
  }
};

// Reducer
const initialState = {};

export default function ticketsReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_TICKETS:
      newState = {};
      action.payload.forEach((ticket) => {
        newState[ticket.id] = ticket;
      });
      return newState;
    case GET_TICKET:
      newState = { ...state, ticket: action.payload };
      return newState;
    case POST_TICKET:
      newState = { ...state, [action.payload.id]: action.payload };
      return newState;
    case PUT_TICKET:
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    case DELETE_TICKET:
      newState = { ...state };
      delete newState[action.payload.id];
      return newState;
    default:
      return state;
  }
}
