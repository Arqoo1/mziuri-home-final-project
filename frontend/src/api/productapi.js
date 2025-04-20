const API_URL = "http://localhost:5000/api/products";

export async function fetchProducts(title, minPrice, maxPrice) {
  try {
    const params = new URLSearchParams({
      title,
      min: minPrice,
      max: maxPrice,
    });
    
    const res = await fetch(`${API_URL}?${params.toString()}`);
    if (!res.ok) throw new Error(`Failed to fetch products: ${res.statusText}`);
    return res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; 
  }
}

export async function fetchProductById(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error(`Failed to fetch product with ID ${id}: ${res.statusText}`);
    return res.json();
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error;  
  }
}
