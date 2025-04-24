const API_URL = "http://localhost:5000/api/products";

const fetchProductData = async () => {
  try {
    const response = await fetch(API_URL); 
    const data = await response.json(); 
    return data;
  } catch (error) {
    console.error('Error fetching product data:', error);
    return [];
  }
};

export default fetchProductData;
