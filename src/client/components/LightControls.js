import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";

const LightControls = () => {
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
    <div>
      Light Controls
      <button onClick={turnOnLights}>Turn On</button>
      <button onClick={turnOffLights}>Turn Off</button>
    </div>
  );
};

export default LightControls;
