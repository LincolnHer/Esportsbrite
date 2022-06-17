import { useSelector } from "react-redux";
import Navigation from "../Navigation";
import "./TicketsPage.css"

const TicketsPage = (isLoaded) => {
    const user = useSelector((state) => state.session.user)
    const events = useSelector((state) => state.events)
    const tickets = useSelector((state) => state.tickets)
    console.log(events)
    const ticketsArr = Object.values(tickets)


  return (
    <div className="Splash-Home">
    <Navigation isLoaded={isLoaded} />
    <main className="event-main ticket">
      <div className="event-container ticket">
        <div className="event-details ticket">
          <div className="ticket-header">
            <div className="user-icon">
                <i className="fas fa-user-circle fa-8x" />
            </div>
            <div className="user-name-container">
                <div className="user-name">{user.username}</div>
                <div className="ticket-length">{ticketsArr?.length}</div>
            </div>
          </div>
        </div>
        <div className="event-about">
          <div className="ticket-container">
            <div className="ticket-description">Tickets</div>
            <div className="ticket-card">
                <div className="ticket-date">
                    <div className="ticket-month">Jun</div>
                    <div className="ticket-day">14</div>
                </div>
                <div className="event-img-ticket">
                    Img
                </div>
                <div className="ticket-event">
                    Event name and Date
                </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
  )
};

export default TicketsPage;
