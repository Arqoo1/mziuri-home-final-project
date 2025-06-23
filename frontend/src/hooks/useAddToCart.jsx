// hooks/useAddToCart.js
import { useUserData } from '../Context/UserContext';
import { addToCart as apiAddToCart } from '../api/productapi';

export function useAddToCart() {
  const { loggedIn, setCart, userData, cart } = useUserData();

  async function addToCart(product, quantity = 1) {
    if (!product) return;

    const productId = product._id || product.productId;

    try {
      if (loggedIn && userData?._id) {
        // User logged in - use backend
        const response = await apiAddToCart(userData._id, productId, quantity);

        // Backend returns cart items (raw)
        const rawCart = response.data || [];

        // Enrich cart with product details (merge)
        const enrichedCart = rawCart.map(item => {
          if (item.productId === productId || item._id === productId) {
            return {
              ...item,
              _id: item.productId || item._id,
              title: product.title,
              image: product.image,
              price: product.salePrice || product.price,
            };
          }
          return item;
        });

        setCart(enrichedCart);
      } else {
        // Guest user - store in localStorage
        const guestCart = JSON.parse(localStorage.getItem('guestCart')) || [];

        const existingIndex = guestCart.findIndex(item => item._id === productId);
        if (existingIndex >= 0) {
          guestCart[existingIndex].quantity += quantity;
        } else {
          guestCart.push({
            _id: productId,
            title: product.title,
            image: product.image,
            price: product.salePrice || product.price,
            quantity,
          });
        }

        localStorage.setItem('guestCart', JSON.stringify(guestCart));
        setCart(guestCart);
      }

      alert('Added to cart!');
    } catch (err) {
      console.error('Add to cart failed:', err);
      alert(`Failed to add to cart: ${err.message || err}`);
    }
  }

  return { addToCart };
}
