import { useState } from "react"
import { useSelector } from "react-redux"
import ".././Modal.css"

const TicketForm = () => {
    const ticket = useSelector((state) => state.tickets)
    const [quantity, setQuantity] = useState(0)

    return (
        <form className="ticket-form">
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
                    <div className="ticket-price">
                        $32.00
                    </div>
                </div>
                <div className="ticket-btn-container">
                    <button className="event-btn">
                        Register
                    </button>
                </div>
            </div>
        </form>
    )
}

export default TicketForm
