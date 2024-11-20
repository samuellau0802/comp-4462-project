import React, { useState} from "react";
import './App.css';
import { Button, Container } from "@mui/material";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import Screen from "./components/Screen";

const App = () => {
  const [isSplit, setIsSplit] = useState(false);


  return (
    <div className="App" style={{ paddingTop: "50px", height: "1000px" }}>
        <Container maxWidth={false} style={{ height: "1000px" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsSplit(!isSplit)}
            > Split Screen </Button>
            <Allotment>
              <Screen />
              {isSplit && (<Screen />)}
            </Allotment>

      </Container>
    </div>
  );
};

export default App;