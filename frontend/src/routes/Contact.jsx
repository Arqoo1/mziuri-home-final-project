import React, { useState } from 'react';
import RouteBanner from '../components/RouteBanner';
import ContactUs from '../components/ContactUs';
import InputGroup from '../components/InputGroup';
import { validateFullName, validateEmail } from '../utils/validations';

function Contact() {
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

  const validateForm = () => {
    const newErrors = {
      name: validateFullName(formData.name),
      email: validateEmail(formData.email),
      type: formData.type ? null : 'Type is required',
      message: formData.message ? null : 'Message is required',
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      setTimeout(() => {
        console.log('Form submitted:', formData);
        setIsSubmitting(false);
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', type: '', message: '' });
        setTimeout(() => setSubmitSuccess(false), 3000);
      }, 1500);
    }
  };

  return (
    <>
      <RouteBanner page="CONTACT" />
      <ContactUs />
      <section className="contact-form">
        <div className="form-container">
          <h2>Send Us a Message</h2>
          {submitSuccess && (
            <div className="success-message">
              Thank you! Your message has been sent successfully.
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <InputGroup
              label="Full Name"
              name="name"
              error={errors.name}
            >
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="full-name"
              />
            </InputGroup>

            <InputGroup
              label="Email"
              name="email"
              error={errors.email}
            >
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="email"
              />
            </InputGroup>

            <InputGroup
              label="subject"
              name="type"
              error={errors.type}
            >
              <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
                placeholder="e.g. Feedback, Support, Inquiry"
                className="type"
              />
            </InputGroup>

            <InputGroup
              label="Message"
              name="message"
              error={errors.message}
            >
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message here..."
                rows="5"
              />
            </InputGroup>

            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Contact;
