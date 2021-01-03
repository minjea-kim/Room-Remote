import React, { useState } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router";
import "./css/lights.scss";

const LightControls = () => {
  const location = useLocation();
  const roomID = location.state.roomID;

  function turnOffLights() {
    axios
      .post(
        "https://maker.ifttt.com/trigger/switch1_off/with/key/cnpX5PYhtCEmEVq4_2WZz2"
      )
      .then(
        (res) => {
          console.log(res);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  function turnOnLights() {
    axios
      .post(
        "https://maker.ifttt.com/trigger/switch1_on/with/key/cnpX5PYhtCEmEVq4_2WZz2"
      )
      .then(
        (res) => {
          console.log(res);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  return (
    <div className="lights-page">
      Room: {roomID}
      <div className="container">
        <h3>Light Controls</h3>
        <button onClick={turnOnLights}>Turn On</button>
        <button onClick={turnOffLights}>Turn Off</button>
      </div>
    </div>
  );
};

export default LightControls;
