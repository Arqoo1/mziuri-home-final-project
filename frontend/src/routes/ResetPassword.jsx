import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { validatePassword, validateConfirmPassword } from '../utils/validations';
import * as api from '../api/usersapi.js';
import RouteBanner from '../components/RouteBanner.jsx';
import InputGroup from '../components/InputGroup.jsx';

function ResetPassword() {
  const [state, setState] = useState({});
  const [errorMessages, setErrorMessages] = useState({});
  const { token } = useParams();

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
      const response = await api.resetPasswordUser(state, token);
      if (response.data) {
      }
    } catch (err) {
      console.error(err);
    }
  };

  const validate = () => {
    const errors = {};
    const passwordError = validatePassword(state.password);
    const confirmPasswordError = validateConfirmPassword(state.confirmPassword);

    if (passwordError) errors.password = passwordError;
    if (confirmPasswordError) errors.confirmPassword = confirmPasswordError;

    return errors;
  };

  return (
    <>
      <RouteBanner page="Reset-Password" />
      <section className="resetPassword">
        <div className="formContainer">
          <form onSubmit={handleSubmit}>
            <div className="titlesContainer">
              <h1 className="title">Reset Your Password</h1>
            </div>

            <InputGroup
              label="Password"
              name="password"
              error={errorMessages.password}
            >
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                value={state.password || ''}
                onChange={handleChange}
                className="input"
              />
            </InputGroup>

            <InputGroup
              label="Confirm Password"
              name="confirmPassword"
              error={errorMessages.confirmPassword}
            >
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm your password"
                value={state.confirmPassword || ''}
                onChange={handleChange}
                className="input"
              />
            </InputGroup>

            <button
              type="submit"
              className="submitButton"
            >
              Reset Password
            </button>

            <div className="additionalContainer">
              <p className="backToLogin">
                Back to <Link to="/login">Log In</Link>
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default ResetPassword;
