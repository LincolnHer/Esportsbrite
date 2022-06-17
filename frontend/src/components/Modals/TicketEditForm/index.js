import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { putTicketThunk } from "../../../store/tickets";
import ".././Modal.css";

const TicketEditForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { eventId } = useParams();
  const user = useSelector((state) => state.session.user);
  const ticket = useSelector((state) => state.tickets);
  const [quantity, setQuantity] = useState(0);

  const submit = async (e) => {
    e.preventDefault();
    const ticketFormVal = {
      eventId: eventId,
      userId: user?.id,
      quantity: quantity,
    };

    const updatedTicket = await dispatch(putTicketThunk(ticketFormVal));

  };

  return (
    <form className="ticket-form" onSubmit={submit}>
      <div className="ticket-form-container">
        <div className="ticket-label-container">
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
          <div className="ticket-price">$32.00</div>
        </div>
        <div className="ticket-btn-container">
          <button className="event-btn">Register</button>
        </div>
      </div>
    </form>
  );
};

export default TicketEditForm;
