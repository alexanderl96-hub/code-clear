import { useState } from "react";


export default function useDarkMode() {
  const [theme, setTheme] = useState("light");
 

  const setMode = (mode)=> {
    window.localStorage.getItem('theme', mode);
   setTheme(mode);
  }

  const toggleTheme = () => {
    theme === "light" ? (setMode("dark") ): setMode("light");
  
  };

  return [ theme, toggleTheme ];
}