function setTitleFromPath() {
  const path = window.location.pathname;

  let title = "MySite";

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
    default:
      const cleanedPath = path.replace("/", "");
      const capitalized =
        cleanedPath.charAt(0).toUpperCase() + cleanedPath.slice(1);
      title = `${capitalized} | floSun`;
  }

  document.title = title;
}

export default setTitleFromPath;
