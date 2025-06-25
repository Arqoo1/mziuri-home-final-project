import { useUserData } from '../Context/UserContext';
import { addToCart as apiAddToCart } from '../api/productapi';

export function useAddToCart() {
  const { loggedIn, setCart, userData, cart } = useUserData();

  async function addToCart(product, quantity = 1) {
    if (!product) return;

    const productId = product._id || product.productId;

    try {
      if (loggedIn && userData?._id) {
        const response = await apiAddToCart(userData._id, productId, quantity);
        const rawCart = response.data || [];

        const enrichedCart = rawCart
          .filter((item) => item.productId) 
          .map((item) => {
            const idStr = item.productId.toString ? item.productId.toString() : item.productId;

            return {
              ...item,
              _id: idStr,
              productId: idStr,
              title: item.title || product.title,
              image: item.image || product.image,
              price: item.price ?? product.salePrice ?? product.price,
              quantity: item.quantity ?? quantity,
            };
          });

        setCart(enrichedCart);
      } else {
        const guestCart = JSON.parse(localStorage.getItem('guestCart')) || [];
        const existingIndex = guestCart.findIndex((item) => item._id === productId);

        if (existingIndex >= 0) {
          guestCart[existingIndex].quantity += quantity;
        } else {
          guestCart.push({
            _id: productId,
            productId: productId,
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
