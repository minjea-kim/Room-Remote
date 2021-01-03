import React, { useState } from "react";
import { useHistory, useLocation } from "react-router";


const MenuPage = () => {
  const location = useLocation();
  const roomID = location.state.roomID;

  function startYouTubeMode() {
    console.log(password);
    history.push({
      pathname: "/youtube",
      state: { password: password },
    });
  }
  return (
    <div>
      Menu
    </div>
  );
};

export default MenuPage;
