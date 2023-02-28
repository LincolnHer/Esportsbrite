import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./SplashPage.css";

const EventsIndex = ({ event }) => {
  const imageUrls = event.imageUrl

  const eventImgStyle = {
    backgroundImage: `url(${imageUrls})`,
  }

  // const defaultImg = {
  //   backgroundImage: 'url("https://www.technewsworld.com/wp-content/uploads/sites/3/2021/09/esports-arena.jpg")',
  // }

  const users = useSelector((state) => state.users);
  const usersArr = Object.values(users);
  const host = usersArr?.find((user) => user?.id === event?.hostId);
  const newDate = new Date(event?.date);
  const dateStr = newDate?.toDateString();

  return (
    <NavLink to={`/events/${event?.id}`} className="event-card">
      {/* <div className="event-img" style={imageUrls === '' ? defaultImg : eventImgStyle}></div> */}
      <div className="event-img" style={eventImgStyle}></div>
      <div className="event-card-content">
        <div className="event-name">{event?.name}</div>
        <div className="event-date">{dateStr}</div>
        <div className="event-location">{event?.location}</div>
        <div className="event-host">by {host?.username}</div>
      </div>
    </NavLink>
  );
};

export default EventsIndex;
