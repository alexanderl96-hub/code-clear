export const apiURL = () => {
    return window.location.hostname === "localhost"
      ? "http://localhost:3333"
      : "https://pursuit-capstone-7011.herokuapp.com";
  };