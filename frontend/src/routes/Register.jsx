import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { register } from '../api/usersapi';
import InputGroup from '../components/InputGroup';
import RouteBanner from '../components/RouteBanner';
import Checkbox from '../components/Checkbox';
import {
  validateEmail,
  validatePassword,
  validateCheckbox,
  validateFullName,
} from '../utils/validations';

function Register() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {
      username: validateFullName(formData.username),
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      rememberMe: validateCheckbox(formData.rememberMe),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((err) => err);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await register(formData);
        navigate('/login');
      } catch (error) {
        console.error('Registration error:', error.message);
      }
    }
  };

  return (
    <>
      <RouteBanner page={t('Register.title')} />
      <div className="register-container">
        <div>
          <h2>{t('Register.title')}</h2>
          <p>{t('Register.subtitle')}</p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="register-form"
        >
          <InputGroup
            label={t('Register.username')}
            name="username"
            error={errors.username}
          >
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder={t('Register.usernamePlaceholder')}
              className={errors.username ? 'input error' : 'input'}
            />
          </InputGroup>

          <InputGroup
            label={t('Register.email')}
            name="email"
            error={errors.email}
          >
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t('Register.emailPlaceholder')}
              className={errors.email ? 'input error' : 'input'}
            />
          </InputGroup>

          <InputGroup
            label={t('Register.password')}
            name="password"
            error={errors.password}
          >
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={t('Register.passwordPlaceholder')}
              className={errors.password ? 'input error' : 'input'}
            />
          </InputGroup>

          <InputGroup
            label=""
            name="rememberMe"
            error={errors.rememberMe}
          >
            <label className="termsRegister">
              <Checkbox
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe || false}
                onChange={handleChange}
              />
              <span className="terms">{t('Register.terms')}</span>
            </label>
          </InputGroup>

          <button
            type="submit"
            className="register-button"
          >
            {t('Register.submit')}
          </button>
        </form>
      </div>
    </>
  );
}

export default Register;
