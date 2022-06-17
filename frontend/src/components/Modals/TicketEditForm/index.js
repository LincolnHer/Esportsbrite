import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { putTicketThunk } from "../../../store/tickets";
import ".././Modal.css";

const TicketEditForm = ({ event, ticket }) => {
    console.log(event)
    console.log(ticket)
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const tickets = useSelector((state) => state.tickets);
  const [quantity, setQuantity] = useState(ticket?.ticket?.quantity);

  const submit = async (e) => {
    e.preventDefault();
    const ticketFormVal = {
    //   eventId: event?.id,
    //   userId: user?.id,
      quantity: quantity,
    };

    const updatedTicket = await dispatch(putTicketThunk(ticketFormVal, ticket?.ticket?.id));

  };

  return (
    <form className="ticket-form" onSubmit={submit}>
      <div className="ticket-form-container">
        <div className="ticket-label-container">
            <h1>Update</h1>
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
          <div className="ticket-price">${event?.price}.00</div>
        </div>
        <div className="ticket-btn-container">
          <button className="event-btn" type="submit">Register</button>
        </div>
      </div>
    </form>
  );
};

export default TicketEditForm;
