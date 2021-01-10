import React, { useRef, useEffect, useState } from "react";
import Navbar from "../../layout/Navbar.js";
import "./css/keyboardmouse.scss";
import AuthenticationError from "../../layout/AuthenticationError.js";
import socketIOClient from "socket.io-client";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";

const KeyboardMouse = () => {
  // Socket Connection Port
  const SOCKET_SERVER = `${process.env.BACKEND_HOST}`;
  console.log("SOCKET_SERVER:", SOCKET_SERVER);


  const [currentMouseSpeed, updateMouseSpeed] = useState(20);

  // Socket Object
  const socketRef = useRef();
  const pressHoldDuration = 50;

  // Create Socket connection
  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER, {
      query: { room: "test" },
    });
  }, []);

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

  const setMouseSpeed = value =>{
    console.log(value)
    updateMouseSpeed(value);
    socketRef.current.emit('changeMouseSpeed', value);
  }

  return (
    <div>
      {window.$authenticated ? (
        <div className="keyboard-mouse-page">
          <h1>{currentMouseSpeed}</h1>
          <Slider onAfterChange={setMouseSpeed} min={5} max={20}/>
          <button
            onMouseDown={(e) => pressingDown(e, "moveMouseUp")}
            onMouseUp={notPressingDown}
            onTouchStart={(e) => pressingDown(e, "moveMouseUp")}
            onTouchEnd={notPressingDown}
          >
            Up
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
            onMouseDown={(e) => pressingDown(e, "moveMouseLeft")}
            onMouseUp={notPressingDown}
            onTouchStart={(e) => pressingDown(e, "moveMouseLeft")}
            onTouchEnd={notPressingDown}
          >
            Left
          </button>

          <button
            onMouseDown={(e) => pressingDown(e, "moveMouseLeftUp")}
            onMouseUp={notPressingDown}
            onTouchStart={(e) => pressingDown(e, "moveMouseLeftUp")}
            onTouchEnd={notPressingDown}
          >
            Left-Up
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
            onMouseDown={(e) => pressingDown(e, "moveMouseRight")}
            onMouseUp={notPressingDown}
            onTouchStart={(e) => pressingDown(e, "moveMouseRight")}
            onTouchEnd={notPressingDown}
          >
            Right
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
            onMouseDown={(e) => pressingDown(e, "moveMouseRightDown")}
            onMouseUp={notPressingDown}
            onTouchStart={(e) => pressingDown(e, "moveMouseRightDown")}
            onTouchEnd={notPressingDown}
          >
            Right-Down
          </button>
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
