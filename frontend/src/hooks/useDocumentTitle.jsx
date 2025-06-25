import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useDocumentTitle = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    switch (pathname) {
      case '/':
        document.title = 'Home - FloSun';
        break;
      case '/login':
        document.title = 'Tune In - FloSun';
        break;
      case '/registration':
        document.title = 'Register - FloSun';
        break;
      case '/explore':
        document.title = 'Explore - FloSun';
        break;
      case '/chat':
        document.title = 'Chat - FloSun';
        break;
      case '/profile':
        document.title = 'Profile - FloSun';
        break;
      case '/terms':
        document.title = 'Terms & Conditions - FloSun';
        break;
      case '/about':
        document.title = 'About - FloSun';
        break;
      case '/contact':
        document.title = 'Contact - FloSun';
        break;
      default:
        document.title = 'FloSun';
    }
  }, [pathname]);
};

export default useDocumentTitle;

