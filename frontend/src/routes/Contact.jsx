import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import RouteBanner from '../components/RouteBanner';
import ContactUs from '../components/ContactUs';
import InputGroup from '../components/InputGroup';
import { validateFullName, validateEmail, validateMessage } from '../utils/validations';
import * as api from '../api/usersapi.js';
import Map from '../components/Map.jsx';

function Contact() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = (data = formData) => {
    const newErrors = {
      name: validateFullName(data.name),
      email: validateEmail(data.email),
      type: data.type ? null : t('validation.typeRequired'),
      message: validateMessage(data.message),
    };
    Object.keys(newErrors).forEach((key) => {
      if (!newErrors[key]) delete newErrors[key];
    });
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const foundErrors = validateForm();
    if (Object.keys(foundErrors).length > 0) {
      setErrors(foundErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await api.contact(formData);
      if (response.data) {
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', type: '', message: '' });
        setErrors({});
        setTimeout(() => setSubmitSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <RouteBanner page={t('contact')} />
      <ContactUs />
      <section className="contact-form">
        <div className="form-container">
          <h2>{t('getInTouch')}</h2>
          {submitSuccess && <div className="success-message">{t('successMessage')}</div>}
          <form
            className="contactform"
            onSubmit={handleSubmit}
          >
            <div className="half-inputs">
              <InputGroup
                label={t('fullName')}
                name="name"
                error={errors.name}
              >
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t('fullNamePlaceholder')}
                  className="full-name"
                />
              </InputGroup>

              <InputGroup
                label={t('email')}
                name="email"
                error={errors.email}
              >
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t('emailPlaceholder')}
                  className="email"
                />
              </InputGroup>
            </div>

            <InputGroup
              label={t('subject')}
              name="type"
              error={errors.type}
            >
              <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
                placeholder={t('subjectPlaceholder')}
                className="type"
              />
            </InputGroup>

            <InputGroup
              label={t('message')}
              name="message"
              error={errors.message}
            >
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={t('messagePlaceholder')}
                rows="5"
              />
            </InputGroup>

            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? t('sending') : t('sendMessage')}
            </button>
          </form>
        </div>
      </section>
      <Map />
    </>
  );
}

export default Contact;
