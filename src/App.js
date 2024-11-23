import React, { useState, useEffect, useRef } from "react";
import './App.css';
import { Container } from "@mui/material";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import Screen from "./components/Screen";
import Header from "./components/Header";

const App = () => {
  const divRef = useRef(null);
  const [isSplit, setIsSplit] = useState(false);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [screenSize, setScreenSize] = useState('xl');

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSplit = () => {
    setIsSplit(!isSplit);
    isSplit ? setScreenSize('xl') : setScreenSize('xl');
  }

  return (
    <div className="App" style={{height: `${windowHeight}px` }}>
      <Header handleSplit={handleSplit} isSplit={isSplit} />
      <Container maxWidth={screenSize} style={{ height: `${windowHeight}px` }}>
        <Allotment>
          <Screen windowHeight={windowHeight} />
          {isSplit && (<Screen windowHeight={windowHeight} />)}
        </Allotment>
      </Container>
    </div>
  );
};

export default App;