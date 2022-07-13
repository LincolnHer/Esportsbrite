import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { putTicketThunk } from "../../../store/tickets";
import ".././Modal.css";

const TicketEditForm = ({ event, ticket, setShowModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const tickets = useSelector((state) => state.tickets);
  const [quantity, setQuantity] = useState(ticket?.ticket?.quantity);
  const [errors, setErrors] = useState([])

  const submit = async (e) => {
    e.preventDefault();
    const ticketFormVal = {
      //   eventId: event?.id,
      //   userId: user?.id,
      quantity: quantity,
    };

    const updatedTicket = await dispatch(
      putTicketThunk(ticketFormVal, ticket?.ticket?.id)
    );
    setShowModal(false);
  };

  useEffect(() => {
    const valiErrs = []
    if (quantity < 1) valiErrs.push("Quantity must be between 1 and 10")
    if (quantity > 10) valiErrs.push("Quantity must be between 1 and 10")
    setErrors(valiErrs)
  }, [quantity])

  return (
    <form className="ticket-form" onSubmit={submit}>
      <ul className="errors">
        {errors?.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <div className="ticket-form-container">
        <div className="ticket-label-container">
          <h1>Update</h1>
          <h4>{event?.name}</h4>
          <label className="ticket-label">
            Tickets *
            <input
              className="ticket-input"
              type="number"
              min="0"
              max="10"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="0"
            />
          </label>
          <div className="general-admission">General Admission</div>
          <div className="ticket-price">${event?.price * quantity}.00</div>
        </div>
        <div className="ticket-btn-container">
          <button className="event-btn" type="submit" disabled={errors.length > 0}>
            Register
          </button>
        </div>
      </div>
    </form>
  );
};

export default TicketEditForm;
