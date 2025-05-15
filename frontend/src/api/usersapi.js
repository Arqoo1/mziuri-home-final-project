import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/users',
  withCredentials: true,
});
export const register = async (formData) => {
  try {
    const { data } = await API.post('/register', formData);
    return data;
  } catch (err) {
    const errorMessage = err.response?.data?.err || 'Registration failed. Try again.';
    throw new Error(errorMessage);
  }
};
export const login = async (formData) => {
  try {
    const requestData = {
      usernameOrEmail: formData.email,
      password: formData.password,
    };

    const { data } = await API.post('/login', requestData);
    return data;
  } catch (err) {
    const errorMessage = err.response?.data?.err || 'Login failed. Please check your credentials.';
    throw new Error(errorMessage);
  }
};

export const forgotPasswordUser = (data) => {
  return axios.put(`http://localhost:5000/api/users/forgot-password`, data, {
    withCredentials: true,
  });
};

export const resetPasswordUser = (data, token) => {
  return axios.put(`http://localhost:5000/api/users/reset-password`, data, {
    headers: { Authorization: token },
    withCredentials: true,
  });
};
