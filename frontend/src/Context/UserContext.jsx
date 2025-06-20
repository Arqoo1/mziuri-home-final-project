import { createContext, useState, useEffect, useContext } from 'react';

// Create context with default values
const UserContext = createContext({
  userData: null,
  setUserData: () => {},
  loggedIn: false,
  setLoggedIn: () => {},
  cart: [],
  setCart: () => {},
  wishlist: [],
  setWishlist: () => {},
});

// Custom hook for consuming the context
export const useUserData = () => useContext(UserContext);

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  // ✅ Initialize cart from localStorage for guest users
  const initialCart = () => {
    const guestCart = localStorage.getItem('guestCart');
    return guestCart ? JSON.parse(guestCart) : [];
  };
  const [cart, setCart] = useState(initialCart);

  // ✅ Initialize wishlist from localStorage for guest users
  const initialWishlist = () => {
    const guestWishlist = localStorage.getItem('guestWishlist');
    return guestWishlist ? JSON.parse(guestWishlist) : [];
  };
  const [wishlist, setWishlist] = useState(initialWishlist);

  // ✅ Persist guest cart when changed
  useEffect(() => {
    if (!loggedIn) {
      localStorage.setItem('guestCart', JSON.stringify(cart));
    }
  }, [cart, loggedIn]);

  // ✅ Persist guest wishlist when changed
  useEffect(() => {
    if (!loggedIn) {
      localStorage.setItem('guestWishlist', JSON.stringify(wishlist));
    }
  }, [wishlist, loggedIn]);

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        loggedIn,
        setLoggedIn,
        cart,
        setCart,
        wishlist,
        setWishlist,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
