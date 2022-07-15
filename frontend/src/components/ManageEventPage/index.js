import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as userEventActions from "../../store/userEvents";
import Navigation from "../Navigation";
import EventCard from "./EventCard";
import "./ManageEventPage.css";

const ManageEventPage = (isLoaded) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const userEvents = useSelector((state) => state.userEvents);
  const userEventsArr = Object.values(userEvents);
//   console.log("User......", user?.id)
//   console.log("USER ARR.......", userEventsArr)

useEffect(() => {
    dispatch(userEventActions.getUserEventsThunk(user?.id));
}, [dispatch])

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <div className="event-form">
        <div className="event-form-container">
          <div className="events">
            <h1>Events</h1>
          </div>
          <div className="events-header">Event</div>
          {/* Component */}
          {userEventsArr?.map((event, idx) => (
              <EventCard key={idx} event={event} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ManageEventPage;
