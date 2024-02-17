export const apiURL = () => {
    return window.location.hostname === "localhost"
      ? "http://localhost:3333"
      : "https://code-clear.netlify.app";
  };