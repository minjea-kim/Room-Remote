import React, { useState } from "react";
import { useHistory, useLocation } from "react-router";
import "./css/menu.scss";

const MenuPage = () => {
  const location = useLocation();
  const history = useHistory();

  const roomID = location.state.roomID;
  const isHost = location.state.isHost;
  console.log("isHost", isHost)

  function startYouTubeMode() {
    console.log(roomID);
    history.push({
      pathname: "/youtube",
      state: { roomID: roomID, isHost: isHost },
    });
  }

  function goToLightsPage() {
    history.push({
      pathname: "/lights",
      state: { roomID: roomID },
    });
  }
  return (
    <div className="menu-page">
      Room: {roomID}
      <div className="container">
        <div className="options">
          <h3>Choose a Mode</h3>
          <button onClick={startYouTubeMode}>YouTube</button>
          <button onClick={goToLightsPage}>Lights</button>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
