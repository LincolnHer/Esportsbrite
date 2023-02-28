import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteEventThunk } from "../../store/events";

const EventCard = (event) => {
  const imageUrls = event.event.imageUrl

  const eventImgStyle = {
    backgroundImage: `url(${imageUrls})`,
  }

  const dispatch = useDispatch();
  const history = useHistory();

  const [showSettings, setShowSettings] = useState(false);

  const openSettings = () => {
    if (showSettings) return;
    setShowSettings(true);
  };

  const editEvent = (e) => {
    e.preventDefault();
    history.push(`/events/${event?.event?.id}/edit`);
  };

  const viewEvent = (e) => {
    e.preventDefault();
    history.push(`/events/${event?.event?.id}`);
  };

  const deleteEvent = async (e) => {
    e.preventDefault();
    const oldEvent = await dispatch(deleteEventThunk(event?.event));
    history.push("/");
  };

  useEffect(() => {
    if (!showSettings) return;

    const closeSettings = () => {
      setShowSettings(false);
    };
    document.addEventListener("click", closeSettings);

    return () => document.removeEventListener("click", closeSettings);
  }, [showSettings]);

  const eventDate = event?.event?.date;
  const eventDateObj = new Date(eventDate);
  const time = eventDateObj?.toLocaleTimeString("en-us");
  const hourMin = time.slice(0, 4);
  const aMpM = time.slice(8, 10);
  const hourMin2 = time.slice(0, 5);
  const aMpM2 = time.slice(8, 11);
  const time2 = hourMin + " " + aMpM;
  const time3 = hourMin2 + " " + aMpM2;
  const dateStr = eventDateObj?.toDateString();
  const month = dateStr?.slice(4, 7);
  const day = dateStr?.slice(8, 10);

  return (
    <div className="event-card-ctr">
      <div className="events-date">
        <div className="events-month">{month}</div>
        <div className="events-day">{day[0] === "0" ? day.slice(1) : day}</div>
      </div>
      <div className="events-img-div">
        <div className="events-img" style={eventImgStyle}></div>
      </div>
      <div className="events-info">
        <div className="events-name">{event?.event?.name}</div>
        <div className="events-location">{event?.event?.location}</div>
        <div className="events-time">{time?.length === 10 ? time2 : time3}</div>
      </div>
      <div className="ellipsis-ctr">
        <div className="ellipsis" onClick={openSettings}>
          <i className="fa-solid fa-ellipsis-vertical fa-lg" />
        </div>
        {showSettings && (
          <div className="settings-dropdown">
            <div className="events-menu" onClick={editEvent}>
              Edit
            </div>
            <div className="events-menu" onClick={viewEvent}>
              View
            </div>
            <div className="events-menu" onClick={deleteEvent}>
              Delete
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;
