import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import './CreateGroupForm.css'
import { setUser } from "../../store/session";

const CreateGroupForm = ({setShowModal}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user)
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("")
    const [location, setLocation] = useState("")
    const [isPrivate, setIsPrivate] = useState(false)
    const [imageFile, setImageFile] = useState(null)


    const onCreateGroup = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("owner_id", user.id);
        formData.append("description", description);
        formData.append("location", location);
        formData.append("isPrivate", isPrivate)

        if (imageFile) formData.append("imageFile", imageFile);

        const response = await axios.post("/api/groups/new", formData, {
            headers: {
                "content-type": "multipart/form-data",
            },
        }); 

        if (!response.errors) {
            dispatch(setUser(response.data));
            setShowModal(false)
            history.push(`/groups/${response.data.id}`);
        } else {
            setErrors(response.errors);
        }
    };

    return (
        <>
            {user.groups_names && (
                <div className='createGroup__container'>
                    <h1 className='form__title'>Create Group</h1>
                    <form className='createGroup__form' onSubmit={onCreateGroup}>
                        <div className='createGroup__errors'>
                            {errors.map((error) => (
                                <div>{error}</div>
                            ))}
                        </div>
                        <div className='form__field-container'>
                            <div className='form__field'>
                                <label className='form__field-label' htmlFor='name'>Group Name</label>
                                <input className='form__field-input'
                                    type="text"
                                    name="name"
                                    placeholder="Group Name"
                                    onChange={e => setName(e.target.value)}
                                    value={name}
                                ></input>
                            </div>
                            <div className='form__field'>
                                <label className='form__field-label' htmlFor="Description">Group Description</label>
                                <input className='form__field-input'
                                    type="text"
                                    name="Description"
                                    placeholder="Description"
                                    onChange={e => setDescription(e.target.value)}
                                    value={description}
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
                                <label className='form__field-label' htmlFor="isPrivate">Private</label>
                                <input className='form__field-input'
                                    type="checkbox"
                                    name="isPrivate"
                                    checked={Boolean(isPrivate)}
                                    onChange={(e) => setIsPrivate(!isPrivate)}
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
                            <div id='form__button-container'>
                                <button className='form__field form__button' type="submit">Create Group</button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};


export default CreateGroupForm