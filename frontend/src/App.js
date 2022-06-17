import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as eventActions from "./store/events";
import * as sessionActions from "./store/session";
import * as userActions from "./store/users";
// import Navigation from './components/Navigation';
// import { Modal } from './context/Modal';
import EditEventFormPage from "./components/EditEventFormPage";
import EventFormPage from "./components/EventFormPage";
import HomePage from "./components/HomePage";
import EventPage from "./components/EventPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import SplashPage from "./components/SplashPage";
import TicketsPage from "./components/TicketsPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    dispatch(eventActions.getEventsThunk());
    dispatch(userActions.getUsersThunk());
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            {user ? (
              <HomePage isLoaded={isLoaded} />
            ) : (
              <SplashPage isLoaded={isLoaded} />
            )}
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <ProtectedRoute exact={true} path="/events/all"></ProtectedRoute>
          <ProtectedRoute exact={true} path="/events/create">
            <EventFormPage isLoaded={isLoaded} />
          </ProtectedRoute>
          <Route exact={true} path="/events/:eventId">
            <ScrollToTop />
            <EventPage isLoaded={isLoaded} />
          </Route>
          <ProtectedRoute exact={true} path="/events/:eventId/edit">
            <EditEventFormPage isLoaded={isLoaded} />
          </ProtectedRoute>
          <ProtectedRoute path="/tickets" exact={true}>
            <ScrollToTop />
            <TicketsPage exact={true} isLoaded={isLoaded}/>
          </ProtectedRoute>
        </Switch>
      )}
    </>
  );
}

export default App;
