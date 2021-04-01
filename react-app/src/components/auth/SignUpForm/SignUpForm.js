import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from 'react-router-dom';
import { setUser } from "../../../store/session"
import { signUp } from '../../../services/auth';
import './SignUpForm.css';

const SignUpForm = ({authenticated, setAuthenticated}) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [location, setLocation] = useState("");

  const onSignUp = async (e) => {
    e.preventDefault();

    if (password === repeatPassword) {
      const user = await signUp(firstName, lastName, email, password, imageFile, location);
      if (!user.errors) {
        setAuthenticated(true);
        dispatch(setUser(user));
      } else {
        setErrors(user.errors);
      }
    }
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

    const updatePassword = (e) => {
      setPassword(e.target.value);
    };

    const updateRepeatPassword = (e) => {
      setRepeatPassword(e.target.value);
    };

  const updateImageFile = (e) => {
    setImageFile(e.target.files[0]);
  };

  const updateLocation = (e) => {
    setLocation(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className='signup__container'>
      <h1 className='form__title'>Sign Up</h1>
      <form className='login__form' onSubmit={onSignUp}>
        <div className='login__errors'>
          {errors.map((error) => (
            <div>{error}</div>
          ))}
        </div>
        <div className='form__field-container'>
        <div className='form__field'>
          <label className='form__field-label' htmlFor='firstName'>First Name</label>
          <input className='form__field-input'
            type="text"
            name="firstName"
            placeholder="First Name"
            onChange={updateFirstName}
            value={firstName}
          ></input>
        </div>
        <div className='form__field'>
          <label className='form__field-label' htmlFor="lastName">Last Name</label>
          <input className='form__field-input'
            type="text"
            name="lastName"
            placeholder="Last Name"
            onChange={updateLastName}
            value={lastName}
          ></input>
        </div>
        <div className='form__field'>
          <label className='form__field-label' htmlFor="email">Email</label>
          <input className='form__field-input'
            type="text"
            name="email"
            placeholder="Email"
            onChange={updateEmail}
            value={email}
          ></input>
        </div>
        <div className='form__field'>
          <label className='form__field-label' htmlFor="location">Location</label>
          <input className='form__field-input'
            type="text"
            name="location"
            placeholder="Location"
            onChange={updateLocation}
            value={location}
          ></input>
        </div>
        <div className='form__field'>
          <label className='form__field-label' htmlFor="imageFile">Picture</label>
          <input className='form__field-input custom-file-input'
            type="file"
            name="imageFile"
            onChange={updateImageFile}
          ></input>
        </div>
        <div className='form__field'>
          <label className='form__field-label' htmlFor="password">Password</label>
          <input className='form__field-input'
            type="password"
            name="password"
            placeholder="Password"
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <div className='form__field'>
          <label className='form__field-label' htmlFor="repeat_password">Confirm Password</label>
          <input className='form__field-input'
            type="password"
            name="repeat_password"
            placeholder="Confirm Password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <div id='form__button-container'>
          <button className='form__field form__button' type="submit">Sign Up</button>
        </div>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
