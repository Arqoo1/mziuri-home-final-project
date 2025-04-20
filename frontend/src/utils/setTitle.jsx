import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function setTitleFromPath() {
  const path = window.location.pathname.toLowerCase();

  let title = "floSun";

  switch (path) {
    case "/":
      title = "Home | floSun";
      break;
    case "/about":
      title = "About | floSun";
      break;
    case "/contact":
      title = "Contact | floSun";
      break;
    case "/shop":
      title = "Shop | floSun";
      break;
    case "/login":
      title = "Login | floSun";
      break;
    case "/register":
      title = "Register | floSun";
      break;
    case "/profile":
      title = "Profile | floSun";
      break;
    case "/wishlist":
      title = "Wishlist | floSun";
      break;
    case "/cart":
      title = "Cart | floSun";
      break;
    case "/checkout":
      title = "Checkout | floSun";
      break;
    case "/compare":
      title = "Compare | floSun";
      break;
    case "/blog":
      title = "Blog | floSun";
      break;
    default:
      if (path.startsWith("/shop/")) {
        title = "Single Product | floSun";
      } else if (path === "*") {
        title = "Not Found (404) | floSun";
      } else {
        const cleanedPath = path.replace("/", "");
        const capitalized = cleanedPath.charAt(0).toUpperCase() + cleanedPath.slice(1);
        title = `${capitalized} | floSun`;
      }
  }

  document.title = title;
}

function TitleUpdater() {
  const location = useLocation();

  useEffect(() => {
    setTitleFromPath();
  }, [location.pathname]);

  return null;
}

export { setTitleFromPath, TitleUpdater };
