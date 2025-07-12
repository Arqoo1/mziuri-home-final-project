// hooks/useWishlist.js
import { useUserData } from '../Context/UserContext';
import { updateUserWishlist as apiUpdateUserWishlist } from '../api/usersapi';

export function useWishlist() {
  const { loggedIn, userData, wishlist, setWishlist } = useUserData();

  async function addToWishlist(product) {
    if (!product) return;

    const productId = product._id || product.productId;

    try {
      if (loggedIn && userData?._id) {
        const newWishlist = [...wishlist];

        const exists = newWishlist.some(
          (item) => item.productId === productId || item._id === productId
        );
        if (!exists) {
          newWishlist.push({ _id: productId, productId, quantity: 1 });
          await apiUpdateUserWishlist(newWishlist);
          setWishlist(newWishlist);
          alert('Added to wishlist!');
        } else {
          alert('Product is already in wishlist');
        }
      } else {
        const guestWishlist = JSON.parse(localStorage.getItem('guestWishlist')) || [];
        const exists = guestWishlist.some((item) => item._id === productId);
        if (!exists) {
          guestWishlist.push({
            _id: productId,
            title: product.title,
            image: product.image,
            price: product.salePrice || product.price,
            quantity: 1,
          });
          localStorage.setItem('guestWishlist', JSON.stringify(guestWishlist));
          setWishlist(guestWishlist);
          alert('Added to wishlist!');
        } else {
          alert('Product is already in wishlist');
        }
      }
    } catch (err) {
      console.error('Add to wishlist failed:', err);
      alert(`Failed to add to wishlist: ${err.message || err}`);
    }
  }

  return { addToWishlist };
}
