const API_URL = "http://localhost:5000/api/products";

export const fetchProductData = async (sort) => {
  try {
    const response = await fetch(`${API_URL}?sort=${sort}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching product data:', error);
    return [];
  }
};

export const fetchSingleProduct = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching single product:', error);
    throw error;
  }
};
