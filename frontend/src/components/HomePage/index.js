import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import backgroundImg from "../../assets/arena.jpeg";
import EventsIndex from "../SplashPage/EventsIndex";
import Navigation from "../Navigation";
import Footer from "../SplashPage/footer";

const backgroundStyle = {
  backgroundImage: `url(${backgroundImg})`,
  backgroundPosition: "bottom",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
};

const HomePage = (isLoaded) => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState(1);
  const [activeId, setActiveId] = useState(1);
  const user = useSelector((state) => state.session.user);
  const events = useSelector((state) => state.events);
  const categories = useSelector((state) => state.categories);
  const eventsArr = Object.values(events);
  const categoriesArr = Object.values(categories);

  let filteredEvents;
  switch (category) {
    case 1:
      filteredEvents = eventsArr;
      break;
    case 2:
      filteredEvents = eventsArr.filter((event) => event?.categoryId === 2);
      break;
    case 3:
      filteredEvents = eventsArr.filter((event) => event?.categoryId === 3);
      break;
    case 4:
      filteredEvents = eventsArr.filter((event) => event?.categoryId === 4);
      break;
    case 5:
      filteredEvents = eventsArr.filter((event) => event?.categoryId === 5);
      break;
    case 6:
      filteredEvents = eventsArr.filter((event) => event?.categoryId === 6);
      break;
    case 7:
      filteredEvents = eventsArr.filter((event) => event?.categoryId === 7);
      break;
    case 8:
      filteredEvents = eventsArr.filter((event) => event?.categoryId === 8);
      break;
    case 9:
      filteredEvents = eventsArr.filter((event) => event?.categoryId === 9);
      break;
    case 10:
      filteredEvents = eventsArr.filter((event) => event?.categoryId === 10);
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
          <div className="categories-ctr">
            <ul className="categories-ul">
              {categoriesArr?.map((category, idx) => (
                <nav className="categories-li-ctr" key={idx}>
                  <li
                    className={`categories-li ${
                      activeId && idx === activeId - 1 ? "active" : ""
                    }`}
                    onClick={() => {
                      setCategory(category?.id);
                      setActiveId(category?.id);
                    }}
                  >
                    {category.type}
                  </li>
                </nav>
              ))}
            </ul>
          </div>
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

export default HomePage;
