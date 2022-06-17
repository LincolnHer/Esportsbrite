import { useSelector } from "react-redux";
import Navigation from "../Navigation";
import backgroundImg from "../../assets/arena.jpeg";
import EventsIndex from "./EventsIndex";
import "./SplashPage.css";

const backgroundStyle = {
  backgroundImage: `url(${backgroundImg})`,
  backgroundPosition: "bottom",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
};

const SplashPage = (isLoaded) => {
  const events = useSelector((state) => state.events);
  const eventsArr = Object.values(events);
  const dateStr = eventsArr[0]?.date;
  const newDate = new Date(dateStr);

  return (
    <div className="Splash-Home">
      <Navigation isLoaded={isLoaded} />
      <main>
        <div className="page-bkg" style={backgroundStyle}>
          <div className="page-title">Evolve your gaming experience</div>
        </div>
        <div className="page-body">
          <div className="event-title">
            <h1>Events</h1>
          </div>
          <div className="events-index">
            {eventsArr?.map((event, idx) => (
              <EventsIndex key={idx} event={event} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SplashPage;
