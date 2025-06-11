import { createContext, useState, useContext } from 'react';

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
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

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
