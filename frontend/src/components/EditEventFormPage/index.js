import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import Navigation from "../Navigation";
import { putEventThunk } from "../../store/events";
import "./EditEventFormPage.css";

const EditEventFormPage = (isLoaded) => {
  const { eventId } = useParams();
  const user = useSelector((state) => state.session.user);
  const events = useSelector((state) => state.events);
  const dispatch = useDispatch();
  const history = useHistory();

  const eventsArr = Object.values(events);
  const currEvent = eventsArr.find((event) => event?.id === +eventId);
  const currDate = new Date().toISOString().split("T")[0];
  const currEventDate = currEvent?.date.split("T")[0];

  const [category, setCategory] = useState(currEvent?.category);
  const [date, setDate] = useState(currEventDate);
  const [description, setDescription] = useState(currEvent?.description);
  const [location, setLocation] = useState(currEvent?.location);
  const [name, setName] = useState(currEvent?.name);
  const [price, setPrice] = useState(currEvent?.price);
  const [errors, setErrors] = useState([]);

  const submit = async (e) => {
    e.preventDefault();
    const eventFormVal = {
      hostId: user?.id,
      category: category,
      date: date,
      description: description,
      location: location,
      name: name,
      imageUrl: null,
      price: price,
    };

    const updatedEvent = await dispatch(putEventThunk(eventFormVal, eventId));
    history.push("/");
  };

  const reset = () => {
    setCategory(currEvent?.category);
    setDate(currEventDate);
    setDescription(currEvent?.description);
    setLocation(currEvent?.location);
    setName(currEvent?.name);
    setPrice(currEvent?.price);
  };

  useEffect(() => {
    const valiErrs = [];
    if (!name?.length) valiErrs.push("Event name is required");
    if (name?.length > 80)
      valiErrs.push("Event name can't exceed 80 characters");
    if (category?.length > 40)
      valiErrs.push("Category name can't exceed 40 characters");
    if (!description?.length)
      valiErrs.push("Please provide a description for your event");
    if (description?.length > 255)
      valiErrs.push("Description can't exceed 255 characters");
    if (!location?.length)
      valiErrs.push("Please provide a location for your event");
    if (location?.length > 255)
      valiErrs.push("Location name can't exceed 255 characters");
    if (!date?.length) valiErrs.push("Please select a date for your event");
    setErrors(valiErrs);
  }, [category, date, description, location, name]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <form onSubmit={submit} className="event-form">
        <div className="event-form-container">
          <ul className="errors">
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <div className="manage-evts-pg">
            <p className="left-arrow"> {"<"} </p>
            <NavLink className="title-link" to="/events/all">
              Events
            </NavLink>
          </div>
          <h1 className="event-form-title">Edit Event</h1>
          <div className="basic-info-container">
            <div className="basic-icon">
              <i className="fa-solid fa-t fa-3x" />
            </div>
            <div className="basic-info">
              <h1 className="basic-title">Basic Info</h1>
              <p className="sub-title">
                Name your event and tell people why they should attend.
              </p>
              <label>
                Name *
                <input
                  className="event-input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  // placeholder="Be clear and descriptive"
                />
              </label>
              <label>
                Category
                <input
                  className="event-input"
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  // placeholder="your category can be null"
                />
              </label>
              <label>
                Description *
                <textarea
                  className="event-input"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  // placeholder="describe details about your event"
                />
              </label>
              <label>
                Price *
                <div className="price-container">
                  <span>$</span>
                  <input
                    className="event-input"
                    type="number"
                    min="0"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="$0.00"
                  />
                </div>
              </label>
            </div>
          </div>
          <hr className="hr-tag" />
          <div className="location-container">
            <div className="basic-icon">
              <i className="fa-solid fa-map-location fa-3x" />
            </div>
            <div className="location">
              <h1 className="basic-title">Location</h1>
              <p className="sub-title">
                Help people discover about your event and let attendees know
                where to show up.
              </p>
              <label>
                Location *
                <input
                  className="event-input"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  // placeholder="Select a venue or address"
                />
              </label>
            </div>
          </div>
          <hr className="hr-tag" />
          <div className="date-container">
            <div className="basic-icon">
              <i className="fa-regular fa-calendar-days fa-3x" />
            </div>
            <div className="date">
              <h1 className="basic-title">Date</h1>
              <p className="sub-title">
                Tell attendees when you're event starts so they can make plans
                to attend.
              </p>
              <label>
                Date *
                <input
                  className="event-input-date"
                  // id="start"
                  // name="start"
                  type="date"
                  value={date}
                  min={currDate}
                  onChange={(e) => setDate(e.target.value)}
                />
              </label>
            </div>
          </div>
          {/* <label>
                imageUrl
                <input
                  type="text"
                  value
                  onChange
                />
              </label> */}
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
        </div>
      </form>
    </>
  );
};

export default EditEventFormPage;
