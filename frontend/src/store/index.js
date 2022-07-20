import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import session from "./session";
import categoriesReducer from "./categories";
import eventsReducer from "./events";
import ticketsReducer from "./tickets";
import usersReducer from "./users";
import userEventsReducer from "./userEvents";

const rootReducer = combineReducers({
  session,
  categories: categoriesReducer,
  events: eventsReducer,
  tickets: ticketsReducer,
  users: usersReducer,
  userEvents: userEventsReducer,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
