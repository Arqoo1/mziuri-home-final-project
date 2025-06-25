import { createContext, useState, useEffect, useContext } from 'react';

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

export const useUserData = () => useContext(UserContext);

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const initialCart = () => {
    const guestCart = localStorage.getItem('guestCart');
    return guestCart ? JSON.parse(guestCart) : [];
  };
  const [cart, setCart] = useState(initialCart);

  const initialWishlist = () => {
    const guestWishlist = localStorage.getItem('guestWishlist');
    return guestWishlist ? JSON.parse(guestWishlist) : [];
  };
  const [wishlist, setWishlist] = useState(initialWishlist);

  useEffect(() => {
    if (!loggedIn) {
      localStorage.setItem('guestCart', JSON.stringify(cart));
    }
  }, [cart, loggedIn]);

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
