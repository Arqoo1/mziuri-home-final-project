import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/usersapi";

import InputGroup from "../components/InputGroup";
import RouteBanner from "../components/RouteBanner";
import Checkbox from "../components/Checkbox";
import {
  validateEmail,
  validatePassword,
  validateCheckbox,
  validateFullName,
} from "../utils/validations";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
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
        navigate("/login");
      } catch (error) {
        console.error("Registration error:", error.message);
      }
    }
  };

  return (
    <>
      <RouteBanner page="register" />
      <div className="register-container">
        <div>
          <h2>Register</h2>
          <p>Create your account to get started.</p>
        </div>
        <form onSubmit={handleSubmit} className="register-form">
          <InputGroup label="Username" name="username" error={errors.username}>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={errors.username ? "input error" : "input"}
            />
          </InputGroup>

          <InputGroup label="Email" name="email" error={errors.email}>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "input error" : "input"}
            />
          </InputGroup>

          <InputGroup label="Password" name="password" error={errors.password}>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? "input error" : "input"}
            />
          </InputGroup>

          <InputGroup label="" name="rememberMe" error={errors.rememberMe}>
            <label className="termsRegister">
              <Checkbox
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe || false}
                onChange={handleChange}
              />
              <span className="terms">I agree to Terms and Conditions</span>
            </label>
          </InputGroup>

          <button type="submit" className="register-button">
            Register
          </button>
        </form>
      </div>
    </>
  );
}

export default Register;
