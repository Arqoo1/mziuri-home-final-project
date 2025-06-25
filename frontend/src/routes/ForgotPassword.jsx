import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { validateEmail } from '../utils/validations';
import * as api from '../api/usersapi.js';
import RouteBanner from '../components/RouteBanner.jsx';
import InputGroup from '../components/InputGroup.jsx';
import Button from '../components/Button';
function ForgotPassword() {
  const { t } = useTranslation();
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
        alert(t('forgotPassword.success'));
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
      <RouteBanner page={t('forgotPassword.pageTitle')} />
      <section className="forgotPassword">
        <div className="formContainer">
          <form
            className="forgot-password-form"
            onSubmit={handleSubmit}
          >
            <div className="titlesContainer">
              <h1 className="title">{t('forgotPassword.title')}</h1>
              <h3 className="subtitle">{t('forgotPassword.subtitle')}</h3>
            </div>

            <InputGroup
              label={t('forgotPassword.email')}
              name="email"
              error={errorMessages.email}
            >
              <input
                type="text"
                name="email"
                id="email"
                className="input"
                placeholder={t('forgotPassword.emailPlaceholder')}
                value={state.email || ''}
                onChange={handleChange}
              />
            </InputGroup>

            <Button
              type="submit"
              className="submitButton"
              text={t('forgotPassword.send')}
            ></Button>
            <div className="additionalContainer">
              <p className="rememberPass">{t('forgotPassword.remember')}</p>
              <Link to="/login">{t('forgotPassword.login')}</Link>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default ForgotPassword;
