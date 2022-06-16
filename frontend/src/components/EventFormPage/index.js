import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Navigation from "../Navigation";
import { postEventThunk } from "../../store/events";
import "./EventForm.css";

const EventFormPage = (isLoaded) => {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const currDate = new Date().toISOString().split("T")[0];

  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [errors, setErrors] = useState([]);

  const submit = async (e) => {
    e.preventDefault();
    const eventFormVal = {
      hostId: user.id,
      category: category,
      date: date,
      description: description,
      location: location,
      name: name,
      imageUrl: null,
      price: price,
    };

    const newEvent = await dispatch(postEventThunk(eventFormVal));
    history.push("/");
  };

  const reset = () => {
    setCategory("");
    setDate("");
    setDescription("");
    setLocation("");
    setName("");
    setPrice(0);
  };

  useEffect(() => {
    const valiErrs = [];
    if (category?.length > 40)
      valiErrs.push("Category name can't exceed 40 characters");
    if (!date?.length) valiErrs.push("Please select a date for you event");
    if (!description?.length)
      valiErrs.push("Please provide a description for you event");
    if (description?.length > 255)
      valiErrs.push("Description can't exceed 255 characters");
    if (!location?.length)
      valiErrs.push("Please provide a location for your event");
    if (location?.length > 255)
      valiErrs.push("Location name can't exceed 255 characters");
    if (!name?.length) valiErrs.push("Event name is required");
    if (name?.length > 80)
      valiErrs.push("Event name cant exceed 80 characters");
    setErrors(valiErrs);
  }, [category, date, description, location, name]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <form onSubmit={submit} className="event-form">
        <ul className="errors">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <h1 className="event-form-title">Create Event</h1>
        <label>
          Name *
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            // placeholder="Be clear and descriptive"
          />
        </label>
        <label>
          Category
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            // placeholder="your category can be null"
          />
        </label>
        <label htmlFor="start">
          Date *
          <input
            id="start"
            name="start"
            type="date"
            value={date}
            min={currDate}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <label>
          Description *
          <textarea
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            // placeholder="describe details about your event"
          />
        </label>
        <label>
          Location *
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            // placeholder="Select a venue or address"
          />
        </label>
        {/* <label>
              imageUrl
              <input
                type="text"
                value
                onChange
              />
            </label> */}
        <label>
          Price *
          <div className="price-container">
            <span>$</span>
            <input
              type="number"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="$0.00"
            />
          </div>
        </label>
        <div className="event-btn-container">
          <button className="event-btn-discard" type="button" onClick={reset}>
            Discard
          </button>
          <button
            className="event-btn"
            type="submit"
            disabled={errors.length > 0}
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default EventFormPage;
