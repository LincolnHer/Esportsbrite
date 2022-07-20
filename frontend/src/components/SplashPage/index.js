import { useState } from "react";
import { useSelector } from "react-redux";
import Navigation from "../Navigation";
import backgroundImg from "../../assets/arena.jpeg";
import EventsIndex from "./EventsIndex";
import Footer from "./footer";
import "./SplashPage.css";

const backgroundStyle = {
  backgroundImage: `url(${backgroundImg})`,
  backgroundPosition: "bottom",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
};

const SplashPage = (isLoaded) => {
  const [category, setCategory] = useState(1);
  const [activeId, setActiveId] = useState(1);
  const events = useSelector((state) => state.events);
  const categories = useSelector((state) => state.categories);
  const eventsArr = Object.values(events);
  const categoriesArr = Object.values(categories);

  let filteredEvents;
  switch(category) {
    case 1:
      filteredEvents = eventsArr
      break;
    case 2:
      filteredEvents = eventsArr.filter((event) => event?.categoryId === 2)
      break;
    case 3:
      filteredEvents = eventsArr.filter((event) => event?.categoryId === 3)
      break;
    case 4:
      filteredEvents = eventsArr.filter((event) => event?.categoryId === 4)
      break;
    case 5:
      filteredEvents = eventsArr.filter((event) => event?.categoryId === 5)
      break;
    case 6:
      filteredEvents = eventsArr.filter((event) => event?.categoryId === 6)
      break;
    case 7:
      filteredEvents = eventsArr.filter((event) => event?.categoryId === 7)
      break;
    case 8:
      filteredEvents = eventsArr.filter((event) => event?.categoryId === 8)
      break;
    case 9:
      filteredEvents = eventsArr.filter((event) => event?.categoryId === 9)
      break;
    case 10:
      filteredEvents = eventsArr.filter((event) => event?.categoryId === 10)
      break;
  }

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
          <nav className="categories-ctr">
            <ul className="categories-ul">
              {categoriesArr?.map((category, idx) => (
                <div
                  className="categories-li-ctr"
                  key={idx}
                >
                  <li
                    className={`categories-li ${activeId && idx === activeId - 1 ? "active" : ""}`}
                    onClick={() => {setCategory(category?.id); setActiveId(category?.id)}}
                    >
                      {category.type}
                  </li>
                </div>
              ))}
            </ul>
          </nav>
          <div className="events-index">
            {filteredEvents?.map((event, idx) => (
              <EventsIndex key={idx} event={event} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SplashPage;
