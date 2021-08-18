import React from 'react';
import Card from "./components/Card";
import Dashboard from "./components/Dashboard";
import {BrowserRouter as Router} from "react-router-dom";

function App() {
  return (
    <Router>
        <Dashboard/>
    </Router>
  );
}

export default App;
