import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as ticketActions from '../../store/tickets'
import backgroundImg from "../../assets/arena.jpeg";
import EventsIndex from "../SplashPage/EventsIndex";
import Navigation from "../Navigation"

const backgroundStyle = {
    backgroundImage: `url(${backgroundImg})`,
    backgroundPosition: "bottom",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

const HomePage = (isLoaded) => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.session.user)
    const events = useSelector((state) => state.events)
    const eventsArr = Object.values(events)

    useEffect(() => {
        dispatch(ticketActions.getTicketsThunk(user.id))
    }, [dispatch])

    return (
        <div className="Splash-Home">
        <Navigation isLoaded={isLoaded} />
        <main>
            <div className="page-bkg" style={backgroundStyle}>
            <div className="page-title">
                Evolve your gaming experience
            </div>
            </div>
            {/* <div className="event-title">
                <h1>Events</h1>
            </div> */}
            <div className="page-body">
            <div className="event-title">
                <h1>Events</h1>
            </div>
            <div className="events-index">
                {eventsArr?.map((event, idx) => (
                <EventsIndex key={idx} event={event}/>
                ))}
            </div>
            </div>
        </main>
        </div>
    )
}

export default HomePage
