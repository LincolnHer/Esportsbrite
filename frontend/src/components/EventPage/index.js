import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import Navigation from "../Navigation";
import { deleteEventThunk } from "../../store/events";
import "./EventPage.css"

const EventPage = (isLoaded) => {
    const { eventId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const users = useSelector((state) => state.users)
    const events = useSelector((state) => state.events)
    const usersArr = Object.values(users)
    const eventsArr = Object.values(events)
    const currEvent = eventsArr.find(event => event?.id === +eventId)
    console.log(currEvent)
    const host = usersArr?.find(user => user?.id === currEvent?.hostId)
    const newDate = new Date(currEvent?.date)
    const dateStr = newDate?.toDateString()
    // Tue Oct 04 2022
    const month = dateStr.slice(4, 7)
    const day = dateStr.slice(8, 10)

    const deleteEvent = async (e) => {
        e.preventDefault()
        const oldEvent = await dispatch(deleteEventThunk(currEvent))
        history.push("/")
    }



    return (
        <div className="Splash-Home">
            <Navigation isLoaded={isLoaded}/>
            <main className="event-main">
                <div className="event-container">
                    {/* <h1>Event Page</h1> */}
                    <div className="event-details">
                        <div className="event-img-2"></div>
                        <div className="event-card-content-2">
                            <div className="event-date-2">{month}</div>
                            <div className="event-date-3">{day}</div>
                            <div className="event-name">{currEvent?.name}</div>
                            {/* <div className="event-location">{currEvent?.location}</div> */}
                            <div className="event-host-2"><span className="by">by</span> {host?.username}</div>
                            <div className="event-btn-container-2">
                                <NavLink to={`/events/${currEvent?.id}/edit`} >
                                    <button className="event-btn" type="button">
                                        edit
                                    </button>
                                </NavLink>
                                <button className="event-btn" type="button" onClick={deleteEvent}>
                                    delete
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="event-ticket">
                        <button className="ticket-btn">Tickets</button>
                    </div>
                    <div className="event-about">
                        <div className="event-description-container">
                            <div className="event-description">{currEvent?.description}</div>
                        </div>
                        <div className="event-info">
                            <span className="event-span">Date</span>
                            <div className="ev-date">
                                <div className="event-description-2">{dateStr}</div>
                            </div>
                            <span className="event-span">Location</span>
                            <div className="ev-location">
                                <div className="event-description-2">{currEvent?.location}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default EventPage;
