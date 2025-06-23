import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/currency';

export async function fetchRates() {
  try {
    const response = await axios.get(`${API_BASE_URL}/rates`);
    return response.data.rates;
  } catch (error) {
    console.error('Failed to fetch currency rates:', error);
    throw error;
  }
}

export async function convertCurrency(amount, targetCurrency) {
  try {
    const response = await axios.get(`${API_BASE_URL}/convert`, {
      params: { amount, targetCurrency }
    });
    return response.data.convertedAmount; 
  } catch (error) {
    console.error('Currency conversion failed:', error);
    throw error;
  }
}

export default {
  fetchRates,
  convertCurrency,
};
