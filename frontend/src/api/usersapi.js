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
      usernameOrEmail: formData.usernameOrEmail,
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

export const contact = async (data) => {
  return axios.post('http://localhost:5000/api/users/contact', data, {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  });
};

export const getToken = async () => {
  const token = localStorage.getItem('token');

  if (!token) throw new Error('No token found in localStorage');

  try {
    const response = await axios.post(`http://localhost:5000/api/users/get-token`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: false, // You no longer need cookies
    });
    return response.data.token; // Or however your backend responds
  } catch (error) {
    const message = error.response?.data?.err || 'Failed to get token';
    throw new Error(message);
  }
};
export const getUser = async () => {
  const token = localStorage.getItem('token');
  // console.log(localStorage.getItem('token'));

  if (!token) throw new Error('No token in localStorage');
  const res = await fetch('http://localhost:5000/api/users/get-user', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`, // <--- this is critical
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch user');
  }

  return await res.json();
};

export const updateUserCart = async (cart) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token in localStorage');

  try {
    const response = await axios.put(
      '/api/users/cart',
      { cart },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
        baseURL: 'http://localhost:5000', // explicitly setting baseURL to your backend server
      }
    );
    return response.data;
  } catch (error) {
    const message = error.response?.data?.err || 'Failed to update cart';
    throw new Error(message);
  }
};

export const updateUserWishlist = async (wishlist) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token in localStorage');

  try {
    const response = await axios.put(
      '/api/users/wishlist',
      { wishlist },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
        baseURL: 'http://localhost:5000',
      }
    );
    return response.data;
  } catch (error) {
    const message = error.response?.data?.err || 'Failed to update wishlist';
    throw new Error(message);
  }
};
