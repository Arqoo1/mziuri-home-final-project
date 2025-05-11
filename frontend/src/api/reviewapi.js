import axios from 'axios';
const API_URL = 'http://localhost:5000/api/reviews/client';

export const fetchReviews = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
};
export default fetchReviews;
