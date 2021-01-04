import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import "../css/lights.scss";

const Applet = ({ appletImage, turnOnWebhook, turnOffWebhook }) => {
  function turnOffLights() {
    console.log(turnOnWebhook);
    axios.post(turnOffWebhook).then(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  function turnOnLights() {
    axios.post(turnOnWebhook).then(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  return (
    <div className="applet">
      <img src={appletImage}></img>
      <div className="controls">
        <button className="turn-on-btn" onClick={turnOnLights}>
          <svg
            viewBox="0 0 28 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0)">
              <path
                d="M10.5834 6.96776V2.26313C10.5834 2.14517 10.5892 2.02861 10.6001 1.91361C4.90405 3.46978 0.703552 8.84041 0.703552 15.2288C0.703552 22.8345 6.65654 29.0001 13.9999 29.0001C21.3433 29.0001 27.2964 22.8345 27.2964 15.2288C27.2964 8.84041 23.0958 3.46978 17.3998 1.91366C17.4107 2.02866 17.4166 2.14517 17.4166 2.26319V6.96786C20.5076 8.34448 22.6778 11.5287 22.6778 15.2287C22.6778 20.1846 18.7849 24.2167 13.9997 24.2167C9.21471 24.2167 5.3216 20.1847 5.3216 15.2287C5.32186 11.5286 7.49231 8.34453 10.5834 6.96776Z"
                fill="#B6EEFF"
              />
              <path
                d="M16.1851 13.9164V6.52975V2.26313C16.1851 2.04293 16.1532 1.83071 16.0966 1.62932C15.8318 0.688308 14.9943 0 14 0C13.0057 0 12.1683 0.688308 11.9035 1.62932C11.8468 1.83055 11.815 2.04293 11.815 2.26313V6.5298V13.9166C11.815 15.1665 12.7931 16.1797 14.0001 16.1797C15.2069 16.1794 16.1851 15.1662 16.1851 13.9164Z"
                fill="#B6EEFF"
              />
            </g>
            <defs>
              <clipPath id="clip0">
                <rect width="28" height="29" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>
        <button className="turn-off-btn" onClick={turnOffLights}>
          <svg
            viewBox="0 0 28 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0)">
              <path
                d="M10.5834 6.96776V2.26313C10.5834 2.14517 10.5892 2.02861 10.6001 1.91361C4.90405 3.46978 0.703552 8.84041 0.703552 15.2288C0.703552 22.8345 6.65654 29.0001 13.9999 29.0001C21.3433 29.0001 27.2964 22.8345 27.2964 15.2288C27.2964 8.84041 23.0958 3.46978 17.3998 1.91366C17.4107 2.02866 17.4166 2.14517 17.4166 2.26319V6.96786C20.5076 8.34448 22.6778 11.5287 22.6778 15.2287C22.6778 20.1846 18.7849 24.2167 13.9997 24.2167C9.21471 24.2167 5.3216 20.1847 5.3216 15.2287C5.32186 11.5286 7.49231 8.34453 10.5834 6.96776Z"
                fill="#FF6666"
              />
              <path
                d="M16.1851 13.9164V6.52975V2.26313C16.1851 2.04293 16.1532 1.83071 16.0966 1.62932C15.8318 0.688308 14.9943 0 14 0C13.0057 0 12.1683 0.688308 11.9035 1.62932C11.8468 1.83055 11.815 2.04293 11.815 2.26313V6.5298V13.9166C11.815 15.1665 12.7931 16.1797 14.0001 16.1797C15.2069 16.1794 16.1851 15.1662 16.1851 13.9164Z"
                fill="#FF6666"
              />
            </g>
            <defs>
              <clipPath id="clip0">
                <rect width="28" height="29" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Applet;
