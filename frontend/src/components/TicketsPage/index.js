import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navigation from "../Navigation";
import * as ticketActions from "../../store/tickets";
import "./TicketsPage.css";
import TicketCard from "./TicketCard";

const TicketsPage = (isLoaded) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const tickets = useSelector((state) => state.tickets);
  const ticketsArr = Object.values(tickets);

  useEffect(() => {
    dispatch(ticketActions.getTicketsThunk(user.id));
  }, [dispatch]);

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
                <div className="user-name">{user?.username}</div>
                <div className="ticket-length">
                  {ticketsArr?.length} tickets
                </div>
              </div>
            </div>
          </div>
          <div className="event-about ticket">
            <div className="ticket-container">
              <div className="ticket-description">Tickets</div>
              {ticketsArr?.map((ticket, idx) => (
                <TicketCard key={idx} ticket={ticket}/>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TicketsPage;
