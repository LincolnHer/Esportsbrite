import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as eventActions from "./store/events";
import * as sessionActions from "./store/session";
import * as userActions from "./store/users";
// import Navigation from './components/Navigation';
// import { Modal } from './context/Modal';
import EditEventFormPage from "./components/EditEventFormPage";
import EventFormPage from "./components/EventFormPage";
import EventPage from "./components/EventPage";
import HomePage from "./components/HomePage";
import LoginFormPage from "./components/LoginFormPage";
import ManageEventPage from "./components/ManageEventPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import SignupFormPage from "./components/SignupFormPage";
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
          <ProtectedRoute exact={true} path="/events/all">
            {/* <ScrollToTop /> */}
            <ManageEventPage isLoaded={isLoaded} />
          </ProtectedRoute>
          <ProtectedRoute exact={true} path="/events/create">
            <ScrollToTop />
            <EventFormPage isLoaded={isLoaded} />
          </ProtectedRoute>
          <Route exact={true} path="/events/:eventId">
            <ScrollToTop />
            <EventPage isLoaded={isLoaded} />
          </Route>
          <ProtectedRoute exact={true} path="/events/:eventId/edit">
            <ScrollToTop />
            <EditEventFormPage isLoaded={isLoaded} />
          </ProtectedRoute>
          <ProtectedRoute path="/tickets" exact={true}>
            <ScrollToTop />
            <TicketsPage exact={true} isLoaded={isLoaded} />
          </ProtectedRoute>
        </Switch>
      )}
    </>
  );
}

export default App;
