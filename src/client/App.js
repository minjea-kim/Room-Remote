import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LandingPage from "./pages/Landing/LandingPage";
import YouTubePartyPage from "./pages/YouTube/YouTubePartyPage.js";
import PartySession from "./pages/YouTube/PartySession.js";
import LightsPage from "./pages/Lights/LightsPage.js";
import Navbar from "./layout/Navbar.js";

window.$authenticated = false;

const App = () => {
  return (
    <main>
      <Router>
        <Route exact path="/" render={() => <LandingPage />} />
        <Route path="/menu" render={() => <Navbar openMenu={true} />} />
        <Route path="/youtubeparty" render={() => <YouTubePartyPage />} />
        <Route path="/partysession" render={() => <PartySession />} />
        <Route path="/lights" render={() => <LightsPage />} />
      </Router>
    </main>
  );
};

export default App;
