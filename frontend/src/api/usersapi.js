import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
// const API_BASE_URL = 'http://localhost:5000';

const API = axios.create({
  baseURL: `${API_BASE_URL}/api/users`,
  withCredentials: true,
});

// REGISTER
export const register = async (formData) => {
  try {
    const { data } = await API.post('/register', formData);
    return data;
  } catch (err) {
    const errorMessage =
      err.response?.data?.err || err.response?.data?.message || 'Registration failed. Try again.';
    throw new Error(errorMessage);
  }
};

// LOGIN
export const login = async (formData) => {
  try {
    const requestData = {
      usernameOrEmail: formData.usernameOrEmail,
      password: formData.password,
    };

    const { data } = await API.post('/login', requestData);
    return data;
  } catch (err) {
    const errorMessage =
      err.response?.data?.err ||
      err.response?.data?.message ||
      'Login failed. Please check your credentials.';
    throw new Error(errorMessage);
  }
};

// FORGOT PASSWORD
export const forgotPasswordUser = (data) => {
  return API.put('/forgot-password', data);
};

// RESET PASSWORD
export const resetPasswordUser = (data, token) => {
  return API.put('/reset-password', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// CONTACT
export const contact = async (data) => {
  try {
    const response = await API.post('/contact', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (err) {
    const errorMessage =
      err.response?.data?.err || err.response?.data?.message || 'Failed to send contact message';
    throw new Error(errorMessage);
  }
};

// GET TOKEN
export const getToken = async () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found in localStorage');

  try {
    const response = await API.post('/get-token', null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: false,
    });
    return response.data.token;
  } catch (error) {
    const message =
      error.response?.data?.err || error.response?.data?.message || 'Failed to get token';
    throw new Error(message);
  }
};

// GET USER
export const getUser = async () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token in localStorage');

  try {
    const response = await API.get('/get-user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.err || error.response?.data?.message || 'Failed to fetch user';
    throw new Error(message);
  }
};

// UPDATE CART
export const updateUserCart = async (cart) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token in localStorage');

  try {
    const response = await API.put(
      '/cart',
      { cart },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.err || error.response?.data?.message || 'Failed to update cart';
    throw new Error(message);
  }
};

// UPDATE WISHLIST
export const updateUserWishlist = async (wishlist) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token in localStorage');

  try {
    const response = await API.put(
      '/wishlist',
      { wishlist },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.err || error.response?.data?.message || 'Failed to update wishlist';
    throw new Error(message);
  }
};
