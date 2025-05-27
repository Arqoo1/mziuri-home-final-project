import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { validateEmail } from '../utils/validations';
import * as api from '../api/usersapi.js';
import RouteBanner from '../components/RouteBanner.jsx';
import InputGroup from '../components/InputGroup.jsx';

function ForgotPassword() {
  const [state, setState] = useState({});
  const [errorMessages, setErrorMessages] = useState({});

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setErrorMessages(errors);
      return;
    }

    try {
      const response = await api.forgotPasswordUser(state);
      if (response.data) {
        alert('Email has been sent');
      }
    } catch (err) {
      throw err;
    }
  };

  const validate = () => {
    const errors = {};
    const emailError = validateEmail(state.email);
    if (emailError) errors.email = emailError;
    return errors;
  };

  return (
    <>
      <RouteBanner page="Forgot-Password" />
      <section className="forgotPassword">
        <div className="formContainer">
          <form className='forgot-password-form' onSubmit={handleSubmit}>
            <div className="titlesContainer">
              <h1 className="title">Forgot your password?</h1>
              <h3 className="subtitle">Password Change</h3>
            </div>

            <InputGroup
              label="Email"
              name="email"
              error={errorMessages.email}
            >
              <input
                type="text"
                name="email"
                id="email"
                className="input"
                placeholder="you@example.com"
                value={state.email || ''}
                onChange={handleChange}
              />
            </InputGroup>

            <button type="submit" className="submitButton">
              Send
            </button>

            <div className="additionalContainer">
              <p className="rememberPass">
                Remember your password? <Link to="/login">Log In</Link>
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default ForgotPassword;
