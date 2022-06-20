import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Modal } from "../../context/Modal";
import TicketEditForm from "../Modals/TicketEditForm";
import { deleteTicketThunk } from "../../store/tickets";

const TicketCard = (ticket) => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state?.events);

  const [showModal, setShowModal] = useState(false);

  const eventsArr = Object.values(events);
  const ticketEvent = eventsArr?.find(
    (event) => event?.id === ticket?.ticket?.eventId
  );
  const createdAt = ticket?.ticket?.createdAt;
  const createdAtDate = new Date(createdAt);
  const dateCreated = createdAt?.slice(0, 10);
  const time = createdAtDate?.toLocaleTimeString("en-us");
  const newDate = new Date(ticketEvent?.date);
  const hourMin = time.slice(0, 4);
  const aMpM = time.slice(8, 10);
  const hourMin2 = time.slice(0, 5);
  const aMpM2 = time.slice(8, 11);
  const time2 = hourMin + " " + aMpM;
  const time3 = hourMin2 + " " + aMpM2
  const dateStr = newDate?.toDateString();
  const ticketDate = dateStr?.slice(0, 15);
  const month = dateStr?.slice(4, 7);
  const day = dateStr?.slice(8, 10);
  const calcPrice = ticketEvent?.price * ticket?.ticket?.quantity;

  const onClose = () => {
    setShowModal(false);
  };

  const deleteTicket = async (e) => {
    e.preventDefault();
    const oldTicket = await dispatch(deleteTicketThunk(ticket?.ticket));
  };

  return (
    <div className="ticket-card-container">
      <NavLink to={`/events/${ticketEvent?.id}`}>
        <div className="ticket-card">
          <div className="ticket-date">
            <div className="ticket-month">{month}</div>
            <div className="ticket-day">{day}</div>
          </div>
          <div className="event-img-ticket">Img</div>
          <div className="ticket-event">
            <div className="ticket-evnt-name">{ticketEvent?.name}</div>
            <div className="ticket-evnt-date">{ticketDate}</div>
            <div>quantity: {ticket?.ticket?.quantity}</div>
            <div>price: ${calcPrice}.00</div>
          </div>
          <div className="ticket-id">
            purchased on:
            <div className="purchase-date">{dateCreated}</div>
            <div className="purchase-time">{time.length === 9 ? time2 : time3}</div>
          </div>
        </div>
      </NavLink>
      <div className="ticket-btn">
        <button
          className="event-btn-ticket"
          type="button"
          onClick={() => setShowModal(true)}
        >
          edit
        </button>
        <button
          className="event-btn-ticket"
          type="button"
          onClick={deleteTicket}
        >
          delete
        </button>
      </div>
      {showModal && (
        <Modal
        // onClose={() => {
        //   setTimeout(() => {
        //     setShowModal(false);
        //   }, 1);
        // }}
        >
          <div className="close-modal">
            <div className="close-btn" onClick={onClose}>
              x
            </div>
          </div>
          <TicketEditForm event={ticketEvent} ticket={ticket} setShowModal={setShowModal} />
        </Modal>
      )}
    </div>
  );
};

export default TicketCard;
