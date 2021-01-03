import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import MenuPage from "./pages/MenuPage";

const App = () => {
  return (
    <main>
      <Router>
        <Route exact path="/" render={() => <LandingPage />}/>
        <Route path="/menu" render={() => <MenuPage />}/>
      </Router>
    </main>
  );
};

export default App;
