import React from "react";
import { useLocation } from "react-router";
import socketClient from "socket.io-client";

const SOCKET_SERVER = "http://127.0.0.1:8080";

const SessionPage = () => {
  const location = useLocation();
  const password = location.state.password;

  var socket = socketClient(SOCKET_SERVER);
  socket.on("connection", () => {
    console.log(`I'm connected with the back-end`);
  });

  return (
    <div>
      Session Page
      {password}
    </div>
  );
};

export default SessionPage;
