import React, { useRef, useEffect, useState } from "react";
import Navbar from "../../layout/Navbar.js";
import "./css/keyboardmouse.scss";
import AuthenticationError from "../../layout/AuthenticationError.js";
import socketIOClient from "socket.io-client";
import Slider, { Range } from "rc-slider";
import axios from "axios";
import "rc-slider/assets/index.css";

const KeyboardMouse = () => {
  // Socket Connection Port
  const SOCKET_SERVER = `${process.env.BACKEND_HOST}`;
  console.log("SOCKET_SERVER:", SOCKET_SERVER);

  const [currentMouseSpeed, updateMouseSpeed] = useState(20);
  const [screenSize, updateScreenSize] = useState({});
  const [screenRatios, updateScreenRatios] = useState({});
  const [openScreen, toggleScreen] = useState(true);

  // Socket Object
  const socketRef = useRef();
  const pressHoldDuration = 50;

  // Create Socket connection
  useEffect(() => {
    axios.get(`${process.env.BACKEND_HOST}/screen-dimensions`).then(
      (res) => {
        console.log(res.data);
        // Get the desktop to mobile ratios
        let xRatio = res.data.width / screen.width;
        let mobileY = (screen.width * res.data.height) / res.data.width;
        let yRatio = res.data.height / mobileY;

        let sizeRatios = {
          x: xRatio,
          y: yRatio,
        };
        let mimicScreen = {
          width: screen.width,
          height: mobileY,
        };
        updateScreenSize(mimicScreen);
        updateScreenRatios(sizeRatios);
      },
      (error) => {
        setErrorMsg("An error has occured. Please try again");
      }
    );

    socketRef.current = socketIOClient(SOCKET_SERVER, {
      query: { room: "test" },
    });
  }, []);

  const goToDesktopPosition = (event) => {
    const offsetY = document.getElementsByClassName("screen")[0].offsetTop;
    let currentX = event.clientX;
    let currentY = event.clientY - offsetY;

    let coordinates = {
      x: currentX * screenRatios.x,
      y: currentY * screenRatios.y,
    };

    socketRef.current.emit("goToScreenPos", coordinates);
  };

  function moveMouse(direction) {
    socketRef.current.emit(direction, {});
  }

  let timerinterval = React.useRef(null);

  const timer = (start, direction) => {
    console.log("starting timer");
    if (start === true) {
      timerinterval.current = setInterval(() => {
        moveMouse(direction);
      }, [100]);
    }
  };

  const pressingDown = (e, direction) => {
    console.log("start");
    console.log(direction);
    e.preventDefault();
    timer(true, direction);
  };

  const notPressingDown = (e) => {
    console.log("stop");
    e.preventDefault();
    timer(false);
    clearInterval(timerinterval.current);
  };

  const setMouseSpeed = (value) => {
    console.log(value);
    updateMouseSpeed(value);
    socketRef.current.emit("changeMouseSpeed", value);
  };

  return (
    <div>
      {window.$authenticated ? (
        <div className="keyboard-mouse-page">
          <Navbar openMenu={false} />
          {openScreen ? (
            <div
              className="screen"
              onClick={goToDesktopPosition}
              style={screenSize}
            ></div>
          ) : (
            <div></div>
          )}

          {/* Screen Controller */}
          <div
            className="open-desktop-btn"
            onClick={() => toggleScreen(!openScreen)}
          >
            Screen Control
          </div>

          {/* Horizontal Scroll */}
          <h1>{currentMouseSpeed}</h1>
          <div className="horizontal-scroll">
            <button
              className="left"
              onClick={() => {
                socketRef.current.emit("scrollLeft");
              }}
            >
              L
            </button>
            <button
              className="right"
              onClick={() => {
                socketRef.current.emit("scrollRight");
              }}
            >
              R
            </button>
          </div>

          {/* Control Pad: Mouse, Mouse Speed, Vertical Scroll*/}
          <div class="control-pad-container">
            <Slider vertical min={5} max={20} onAfterChange={setMouseSpeed} />
            <div className="control-pad">
              <button
                onMouseDown={(e) => pressingDown(e, "moveMouseLeftUp")}
                onMouseUp={notPressingDown}
                onTouchStart={(e) => pressingDown(e, "moveMouseLeftUp")}
                onTouchEnd={notPressingDown}
              >
                Left-Up
              </button>
              <button
                onMouseDown={(e) => pressingDown(e, "moveMouseUp")}
                onMouseUp={notPressingDown}
                onTouchStart={(e) => pressingDown(e, "moveMouseUp")}
                onTouchEnd={notPressingDown}
              >
                Up
              </button>

              <button
                onMouseDown={(e) => pressingDown(e, "moveMouseRightUp")}
                onMouseUp={notPressingDown}
                onTouchStart={(e) => pressingDown(e, "moveMouseRightUp")}
                onTouchEnd={notPressingDown}
              >
                Right-Up
              </button>

              <button
                onMouseDown={(e) => pressingDown(e, "moveMouseLeft")}
                onMouseUp={notPressingDown}
                onTouchStart={(e) => pressingDown(e, "moveMouseLeft")}
                onTouchEnd={notPressingDown}
              >
                Left
              </button>

              <button
                onMouseDown={(e) => pressingDown(e, "")}
                onMouseUp={notPressingDown}
                onTouchStart={(e) => pressingDown(e, "")}
                onTouchEnd={notPressingDown}
              >
                MId
              </button>

              <button
                onMouseDown={(e) => pressingDown(e, "moveMouseRight")}
                onMouseUp={notPressingDown}
                onTouchStart={(e) => pressingDown(e, "moveMouseRight")}
                onTouchEnd={notPressingDown}
              >
                Right
              </button>

              <button
                onMouseDown={(e) => pressingDown(e, "moveMouseLeftDown")}
                onMouseUp={notPressingDown}
                onTouchStart={(e) => pressingDown(e, "moveMouseLeftDown")}
                onTouchEnd={notPressingDown}
              >
                Left-Down
              </button>
              <button
                onMouseDown={(e) => pressingDown(e, "moveMouseDown")}
                onMouseUp={notPressingDown}
                onTouchStart={(e) => pressingDown(e, "moveMouseDown")}
                onTouchEnd={notPressingDown}
              >
                Down
              </button>

              <button
                onMouseDown={(e) => pressingDown(e, "moveMouseRightDown")}
                onMouseUp={notPressingDown}
                onTouchStart={(e) => pressingDown(e, "moveMouseRightDown")}
                onTouchEnd={notPressingDown}
              >
                Right-Down
              </button>
            </div>

            <div class="vertical-scroll">
              <button
                class="up"
                onClick={() => {
                  socketRef.current.emit("scrollUp");
                }}
              >
                U
              </button>
              <button
                class="down"
                onClick={() => {
                  socketRef.current.emit("scrollDown");
                }}
              >
                D
              </button>
            </div>
          </div>

          {/* Left and Right Clickers */}
          <div className="clickers">
            <button
              className="left-click"
              onClick={() => {
                socketRef.current.emit("leftClick");
              }}
            >
              L
            </button>
            <button
              className="right-click"
              onClick={() => {
                socketRef.current.emit("rightClick");
              }}
            >
              R
            </button>
          </div>

          <div className="divider" />

          {/* Miscellaneous Controls */}
          <div className="misc-controls">
            <button
              className="zoom-in"
              onClick={() => {
                socketRef.current.emit("zoomIn");
              }}
            >
              ZOOM +
            </button>
            <button
              className="zoom-out"
              onClick={() => {
                socketRef.current.emit("zoomOut");
              }}
            >
              ZOOM -
            </button>
            <button className="function">FUNCTION</button>
            <button className="replay-function">R</button>
          </div>

          {/* Text Control */}
          <div className="text-control">
            <input placeholder="Enter text to send" />
            <button className="send-text-btn">^</button>
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

export default KeyboardMouse;
