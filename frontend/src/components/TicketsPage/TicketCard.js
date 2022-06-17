import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const TicketCard = (ticket) => {
  const events = useSelector((state) => state.events)
  const eventsArr = Object.values(events)
  const ticketEvent = eventsArr.find(event => event?.id === ticket?.ticket?.eventId)
  const createdAt = ticket?.ticket?.createdAt
  const createdAtDate = new Date(createdAt)
  const dateCreated = createdAt?.slice(0,10)
  const time = createdAtDate?.toLocaleTimeString('en-us')
  const newDate = new Date(ticketEvent?.date);
  console.log(createdAtDate)
  const hourMin = time.slice(0,4)
  const aMpM = time.slice(8,10)
  const time2 = hourMin + ' ' + aMpM
  const dateStr = newDate?.toDateString();
  const ticketDate = dateStr?.slice(0,15)
  const month = dateStr?.slice(4, 7);
  const day = dateStr?.slice(8,10)
  const calcPrice = ticketEvent?.price * ticket?.ticket?.quantity

  const test = (e) => {
    e.preventDefault()
    console.log("hello")
  }

  return (
    <NavLink to={`/events/${ticketEvent.id}`}>
      <div className="ticket-card">
        <div className="ticket-date">
          <div className="ticket-month">{month}</div>
          <div className="ticket-day">{day}</div>
        </div>
        <div className="event-img-ticket">Img</div>
        <div className="ticket-event">
          <div className="ticket-evnt-name">
              {ticketEvent?.name}
          </div>
          <div className="ticket-evnt-date">
              {ticketDate}
          </div>
          <div>quantity: {ticket?.ticket?.quantity}</div>
          <div>price: ${calcPrice}.00</div>
          <div className="ticket-btn">
            <button className="event-btn-ticket"
              onClick={test}
            >edit</button>
            <button className="event-btn-ticket">delete</button>
          </div>
        </div>
        <div className="ticket-id">purchased on:
          <div className="purchase-date">
            {dateCreated}
          </div>
          <div className="purchase-time">
            {time2}
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default TicketCard;
