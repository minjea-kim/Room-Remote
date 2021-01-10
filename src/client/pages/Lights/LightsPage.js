import React, { useState } from "react";
import Navbar from "../../layout/Navbar.js";
import "./css/lights.scss";
import Applet from "./components/Applet.js";
import AuthenticationError from "../../layout/AuthenticationError.js";
import Lamp from './img/lamp.png';

const LightControls = () => {
  return (
    <div>
      {window.$authenticated ? (
        <div className="lights-page">
          <Navbar openMenu={false} />
          <div className="container">
            <Applet
              appletImage={Lamp}
              turnOnWebhook={
                "https://maker.ifttt.com/trigger/switch1_on/with/key/cnpX5PYhtCEmEVq4_2WZz2"
              }
              turnOffWebhook={
                "https://maker.ifttt.com/trigger/switch1_off/with/key/cnpX5PYhtCEmEVq4_2WZz2"
              }
            />

          </div>
        </div>
      ) : (
        <div>
          <AuthenticationError />
        </div>
      )}
    </div>
  );
};

export default LightControls;
