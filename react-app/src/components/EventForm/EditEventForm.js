import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { getEvent } from '../../store/event';
import './EventForm.css';

const EditEventForm = ({setShowModal, storeEvent}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState(storeEvent.name);
  const [groupId, setGroupId] = useState(storeEvent.group_id);
  const [details, setDetails] = useState(storeEvent.details);
  const [location, setLocation] = useState(storeEvent.location);
  const [imageFile, setImageFile] = useState(null);
  const [date, setDate] = useState('');
  const [capacity, setCapacity] = useState(storeEvent.capacity);

  useEffect(() => {
    if (storeEvent) {
      let rawDate = new Date(storeEvent.date);
      let parsedDate = rawDate.toISOString().split('T')[0];
      setDate(parsedDate);
    }
  }, [storeEvent]);

  const onEditEvent = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("group_id", groupId);
    formData.append("details", details);
    formData.append("location", location);
    formData.append("date", date);
    formData.append("capacity", capacity);
    if(imageFile) formData.append("imageFile", imageFile);

    const response = await axios.patch(`/api/events/${storeEvent.id}`, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    if (!response.errors) {
      setShowModal(false);
      dispatch(getEvent(storeEvent.id));
    } else {
      setErrors(response.errors);
    }
  };

  return (
    <>
      {user.groups_names && storeEvent && (
        <div className='createEvent__container'>
          <h1 className='form__title'>Edit Event</h1>
          <form className='createEvent__form' onSubmit={onEditEvent}>
            <div className='createEvent__errors'>
              {errors.map((error) => (
                <div>{error}</div>
              ))}
            </div>
            <div className='form__field-container'>
            <div className='form__field'>
              <label className='form__field-label' htmlFor='name'>Event Name</label>
              <input className='form__field-input'
                type="text"
                name="name"
                placeholder="Event Name"
                onChange={e => setName(e.target.value)}
                value={name}
              ></input>
            </div>
            <div className='form__field'>
              <label className='form__field-label' htmlFor="groupId">Group</label>
              <select className='form__field-input' value={groupId} onChange={e => setGroupId(e.target.value)}>
                <option value=''>Choose Group</option>
                {user.groups_names.map((group) => (
                  <option key={group.id} value={group.id}>{group.name}</option>
                ))}
              </select>
            </div>
            <div className='form__field'>
              <label className='form__field-label' htmlFor="details">Event Description</label>
              <input className='form__field-input'
                type="text"
                name="details"
                placeholder="Details"
                onChange={e => setDetails(e.target.value)}
                value={details}
              ></input>
            </div>
            <div className='form__field'>
              <label className='form__field-label' htmlFor="location">Location</label>
              <input className='form__field-input'
                type="text"
                name="location"
                placeholder="Location"
                onChange={e => setLocation(e.target.value)}
                value={location}
              ></input>
            </div>
            <div className='form__field'>
              <label className='form__field-label' htmlFor="imageFile">Picture</label>
              <input className='form__field-input'
                type="file"
                name="imageFile"
                onChange={e => setImageFile(e.target.files[0])}
              ></input>
            </div>
            <div className='form__field'>
              <label className='form__field-label' htmlFor="date">Date</label>
              <input className='form__field-input'
                type="date"
                name="date"
                placeholder="Date"
                onChange={e => setDate(e.target.value)}
                value={date}
              ></input>
            </div>
            <div className='form__field'>
              <label className='form__field-label' htmlFor="capacity">Event Capacity</label>
              <input className='form__field-input'
                type="number"
                name="capacity"
                placeholder="Event Capacity"
                onChange={e => setCapacity(e.target.value)}
                value={capacity}
              ></input>
            </div>
            <div id='form__button-container'>
              <button className='form__field form__button' type="submit">Edit Event</button>
            </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default EditEventForm;
