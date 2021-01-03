import React, { useRef, useEffect } from "react";
import { useLocation } from "react-router";
import socketIOClient from "socket.io-client";


const SOCKET_SERVER = "http://localhost:3000";

const SessionPage = () => {
  const location = useLocation();
  const password = location.state.password;
  const socketRef = useRef();

  useEffect(() => {
    console.log(password);
    socketRef.current = socketIOClient(SOCKET_SERVER, {
      query: {password},
    });
  });

  return (
    <div>
      Session Page
      {password}
    </div>
  );
};

export default SessionPage;
