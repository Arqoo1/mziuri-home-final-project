import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputGroup from "../components/InputGroup";
import RouteBanner from "../components/RouteBanner";
import Checkbox from "../components/Checkbox";
import { login } from "../api/usersapi";
import {
  validateEmail,
  validatePassword,
  validateCheckbox,
} from "../utils/validations";

function Login() {
  const [formData, setFormData] = useState({
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
        await login(formData);
        console.log("Login successful", formData);
        navigate("/");
      } catch (error) {
        console.error("Login error:", error);
      }
    }
  };

  return (
    <>
      <RouteBanner page={"login"} />
      <div className="login-container">
        <div>
          <h2>Login</h2>
          <p>Please login using account detail below.</p>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
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
            <div className="checkbox-container">
              <label className="termsLabel">
                <div>
                  <Checkbox
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe || false}
                    onChange={handleChange}
                  />
                  <span className="terms">Remember me</span>
                </div>
              </label>
              <a>forget password?</a>
            </div>
          </InputGroup>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
