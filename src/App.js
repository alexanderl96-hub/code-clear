import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import logo from "./Assets/icons/Logo.png";
import './App.css';
// import Navbar from "./Components/Navbar/Navbar";
import { UserProvider } from "./Providers/UserProviders";
import styled, { ThemeProvider } from "styled-components";
import Containered from "./Components/Containered";
import useLightMode from "./styles/useLightMode";

import { GlobalStyle, lightTheme, darkTheme } from "./styles/globalStyles";
import Toggle from "./styles/toggle";

import Home from "./Pages/Home";
import Report from "./Pages/Report";

const Container = styled.div`
  max-width: 100%;
  margin-top: 500px auto 0;
`;

function App() {
  const [theme, toggleTheme] = useLightMode();
  const themeMode = theme === "light" ? lightTheme : darkTheme;

  const [count, setCount] = useState("");
  const [countInTimeout, setCountInTimeout] = useState(
    <img src={logo} className="App-logo" alt="call" />
  );

  useEffect(() => {
    setTimeout(() => {
      setCountInTimeout(count);
    }, 3000);
    setCount();
  }, [count]);


  return (
    <div className="App">
      {/* <UserProvider> */}
        <Router>
          {/* <Navbar /> */}
          <Containered />  
            {!countInTimeout ? (
             
              <ThemeProvider theme={themeMode}>
                <Container>
                  <GlobalStyle />
                  <Toggle theme={theme} toggleTheme={toggleTheme} />
                  <Routes>
                    <Route exact path="/" element={<Home />} className="App" />
                    <Route path="/report" element={<Report />} />
                  </Routes>
                </Container>
              </ThemeProvider>
               
            ) : (
              <div className="App">
                <h1>Welcome</h1>
                <div className="infinite">{countInTimeout}</div>
                <h2 className="CodeClear">Code Clear</h2>
              </div>
            )}
        
        </Router>
      {/* </UserProvider> */}
    </div>
  );
}

export default App;
