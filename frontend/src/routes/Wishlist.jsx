import React from 'react';
import RouteBanner from '../components/RouteBanner';
import ItemsTable from '../components/ItemsTable';
import { updateUserWishlist } from '../api/usersapi';
import { useUserData } from '../Context/UserContext';

function Wishlist() {
  const { wishlist, setWishlist, loggedIn } = useUserData();

  return (
    <>
      <RouteBanner page="Wishlist" />
      <section className="ProductTable">
        <ItemsTable
          items={wishlist}
          setItems={setWishlist}
          loggedIn={loggedIn}
          updateBackend={updateUserWishlist}
          isCart={false}
        />
      </section>
    </>
  );
}

export default Wishlist;
