import React, { useState, useEffect, useContext } from "react";
import {ApartmentsContext } from "./context/ApartmentsContext";
import axios from 'axios';
import NavBar from "./components/NavBar";
import './style/style.css';
function App() {

  const { RetrieveData } = useContext(ApartmentsContext);
  useEffect(() => {
    RetrieveData();
  }, [])  

  return (
    <div className="App">
      <header className="App-header">
        <h1>Butų rezervavimo sistema</h1>
      </header>
      <NavBar />
    </div>

  );
}

export default App;
