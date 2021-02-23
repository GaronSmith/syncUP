import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";

import { setUser } from "../../../store/session"
import { login } from "../../../services/auth";
import './LoginForm.css'
const LoginForm = ({ authenticated, setAuthenticated }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    if (!user.errors) {
      setAuthenticated(true);
      dispatch(setUser(user))
      history.push('/')
    } else {
      setErrors(user.errors);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className= 'login__container'>
      <h1 className='form__title'>Login</h1>
      <form className='login__form' onSubmit={onLogin}>
        <div className='login__errors' >
          {errors.map((error) => (
            <div>{error}</div>
          ))}
        </div>
        <div className= 'form_field-container'>
          <div className='form__field'>
            <label className='form__field-label' htmlFor="email">Email</label>
            <input className='form__field-input'
              name="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div className='form__field'>
            <label className='form__field-label' htmlFor="password">Password</label>
            <input className='form__field-input'
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={updatePassword}
            />
            <button type="submit">Login</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
