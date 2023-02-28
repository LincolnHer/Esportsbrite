import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import Navigation from "../Navigation";
import { postEventThunk } from "../../store/events";
import "./EventForm.css";

const EventFormPage = (isLoaded) => {
  const user = useSelector((state) => state.session.user);
  const categories = useSelector((state) => state.categories);
  const categoriesArr = Object.values(categories);
  // const events = useSelector((state) => state.events.events)
  // console.log(events)
  const category1 = categoriesArr.shift();
  const dispatch = useDispatch();
  const history = useHistory();
  const currDate = new Date().toISOString().split("T")[0];

  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [imgUrl, setImgUrl] = useState("https://www.technewsworld.com/wp-content/uploads/sites/3/2021/09/esports-arena.jpg");
  const [price, setPrice] = useState(0);
  const [errors, setErrors] = useState([]);

  const submit = async (e) => {
    e.preventDefault();
    const eventFormVal = {
      hostId: user?.id,
      categoryId: +category,
      date: date,
      description: description,
      location: location,
      name: name,
      imageUrl: imgUrl,
      price: price,
    };
    console.log(eventFormVal);

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
    setImgUrl("");
  };

  useEffect(() => {
    const valiErrs = [];
    if (!name?.length) valiErrs.push("Event name is required");
    if (name?.length > 80)
      valiErrs.push("Event name can't exceed 80 characters");
    if (category === "") valiErrs.push("Select a category");
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
    if (!imgUrl.length) valiErrs.push("Image Url can't be empty");
    setErrors(valiErrs);
  }, [category, date, description, location, name, imgUrl]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <form onSubmit={submit} className="event-form">
        <div className="event-form-container">
          <ul className="errors">
            {errors?.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <div className="manage-evts-pg">
            <p className="left-arrow"> {"<"} </p>
            <NavLink className="title-link" to="/events/all">
              Events
            </NavLink>
          </div>
          <h1 className="event-form-title">Create Event</h1>
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
                <select
                  className="event-input select"
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  // placeholder="your category can be null"
                >
                  <option value="">Category</option>
                  {categoriesArr?.map((category, idx) => (
                    <option key={idx} value={category?.id}>
                      {category?.type}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Description *
                <textarea
                  className="event-input description"
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
              <label>
                Image Url
                <input
                  className="event-input"
                  type="text"
                  value={imgUrl}
                  onChange={(e) => setImgUrl(e.target.value)}
                  // placeholder="If no url leave it blank"
                />
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
              disabled={errors?.length > 0}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default EventFormPage;
