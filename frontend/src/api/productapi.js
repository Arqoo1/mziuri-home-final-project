const API_URL = "http://localhost:5000/api/products";

const fetchProductData = async () => {
  try {
    const response = await fetch(API_URL); // Using fetch to make the request
    if (!response.ok) { // Check if the response is successful (status code 200-299)
      throw new Error('Network response was not ok');
    }
    const data = await response.json(); // Parse the JSON response
    return data;
  } catch (error) {
    console.error('Error fetching product data:', error);
    return []; // Return an empty array in case of an error
  }
};

export default fetchProductData;
