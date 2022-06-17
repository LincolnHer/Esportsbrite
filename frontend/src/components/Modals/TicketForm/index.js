import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { postTicketThunk } from "../../../store/tickets";
import ".././Modal.css";

const TicketForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { eventId } = useParams();
  const user = useSelector((state) => state.session.user);
  const events = useSelector((state) => state.events)
  const eventsArr = Object.values(events)
  const currEvent = eventsArr?.find(event => event?.id == + eventId)
  const ticket = useSelector((state) => state.tickets);
  const [quantity, setQuantity] = useState(0);

  const submit = async (e) => {
    e.preventDefault();
    const ticketFormVal = {
      eventId: eventId,
      userId: user?.id,
      quantity: quantity,
    };

    const newTicket = await dispatch(postTicketThunk(ticketFormVal));
    history.push("/tickets");
  };

  return (
    <form className="ticket-form" onSubmit={submit}>
      <div className="ticket-form-container">
        <div className="ticket-label-container">
          <h1>Purchase</h1>
          <label className="ticket-label">
            Tickets *
            <input
              className="ticket-input"
              type="number"
              min="0"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="0"
            />
          </label>
          <div className="general-admission">General Admission</div>
          <div className="ticket-price">${currEvent?.price}.00</div>
        </div>
        <div className="ticket-btn-container">
          <button className="event-btn">Register</button>
        </div>
      </div>
    </form>
  );
};

export default TicketForm;
