import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import SessionPage from "./components/SessionPage";

const App = () => {
  return (
    <main>
      <Router>
        <Route exact path="/" render={() => <LandingPage />}/>
        <Route path="/session" render={() => <SessionPage />}/>
      </Router>
    </main>
  );
};

export default App;
