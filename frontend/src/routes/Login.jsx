import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import InputGroup from '../components/InputGroup';
import RouteBanner from '../components/RouteBanner';
import Checkbox from '../components/Checkbox';
import { login } from '../api/usersapi';
import { validateEmail, validatePassword, validateCheckbox } from '../utils/validations';
import { Link } from 'react-router-dom';

function Login() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      rememberMe: validateCheckbox(formData.rememberMe),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await login({
          usernameOrEmail: formData.email,
          password: formData.password,
        });

        if (response.token) {
          if (formData.rememberMe) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('username', response.data.username);
          } else {
            sessionStorage.setItem('token', response.token);
            sessionStorage.setItem('username', response.data.username);
          }

          setIsAuthenticated(true);
          navigate('/');
        } else {
          alert(t('login.tokenNotFound'));
        }
      } catch (error) {
        alert(error.message || t('login.failed'));
      }
    }
  };

  return (
    <>
      <RouteBanner page={t('Login.login')} />
      <div className="login-container">
        <div>
          <h2>{t('Login.login')}</h2>
          <p>{t('Login.subtitle')}</p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="login-form"
        >
          <InputGroup
            label={t('form.email')}
            name="email"
            error={errors.email}
          >
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'input error' : 'input'}
            />
          </InputGroup>

          <InputGroup
            label={t('form.password')}
            name="password"
            error={errors.password}
          >
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'input error' : 'input'}
            />
          </InputGroup>

          <InputGroup
            label=""
            name="rememberMe"
            error={errors.rememberMe}
          >
            <div className="checkbox-container">
              <label className="termsLabel">
                <div>
                  <Checkbox
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe || false}
                    onChange={handleChange}
                  />
                  <span className="terms">{t('Login.rememberMe')}</span>
                </div>
              </label>
              <Link
                to="/register"
                className="forgot-password-link"
              >
                {t('Login.forgotPassword')}
              </Link>{' '}
            </div>
          </InputGroup>

          <button
            type="submit"
            className="login-button"
          >
            {t('Login.login')}
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
