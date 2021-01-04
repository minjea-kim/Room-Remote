import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LandingPage from "./pages/Landing/LandingPage";
import YouTubePage from "./pages/YouTube/YouTubePage.js";
import LightsPage from "./pages/Lights/LightsPage.js";
import Navbar from "./layout/Navbar.js";

window.$authenticated = false;

const App = () => {
  return (
    <main>
      <Router>
        <Route exact path="/" render={() => <LandingPage />} />
        <Route path="/menu" render={() => <Navbar openMenu={true} />} />
        <Route path="/youtubeparty" render={() => <YouTubePage />} />
        <Route path="/youtube" render={() => <YouTubePage />} />
        <Route path="/lights" render={() => <LightsPage />} />
      </Router>
    </main>
  );
};

export default App;
