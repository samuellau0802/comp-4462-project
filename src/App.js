import React, { useState, useEffect } from "react";
import './App.css';
import { Container } from "@mui/material";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import Screen from "./components/Screen";
import Header from "./components/Header";
import ScrollyTelling from "./components/ScrollyTelling"; // Make sure to import ScrollyTelling

const App = () => {
  const [isSplit, setIsSplit] = useState(false);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [screenSize, setScreenSize] = useState('xl');
  const [showScrollyTelling, setShowScrollyTelling] = useState(false);

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
    isSplit ? setScreenSize('xl') : setScreenSize('max');
  }

  const handleScrollyTellingComplete = () => {
    setShowScrollyTelling(false);
  };

  const startScrollyTelling = () => {
    setShowScrollyTelling(true);
  };

  if (showScrollyTelling) {
    return <ScrollyTelling onComplete={handleScrollyTellingComplete} />;
  }

  return (
    <div className="App" style={{height: `${windowHeight}px` }}>
      <Header handleSplit={handleSplit} isSplit={isSplit} startScrollyTelling={startScrollyTelling} />
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