import React, { useState } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router";
import "./css/lights.scss";

const LightControls = () => {
  const location = useLocation();
  const roomID = location.state.roomID;

  function turnOffLights(webhook) {
    axios.post(webhook).then(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  function turnOnLights(webhook) {
    axios.post(webhook).then(
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
        <div className="applet">
          <img src="http://placekitten.com/200/300"></img>
          <div className="controls">
            <button
              className="turn-on-btn"
              onClick={() =>
                turnOnLights(
                  "https://maker.ifttt.com/trigger/switch1_on/with/key/cnpX5PYhtCEmEVq4_2WZz2"
                )
              }
            >
              Turn On
            </button>
            <button
              className="turn-off-btn"
              onClick={() =>
                turnOffLights(
                  "https://maker.ifttt.com/trigger/switch1_off/with/key/cnpX5PYhtCEmEVq4_2WZz2"
                )
              }
            >
              Turn Off
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LightControls;
