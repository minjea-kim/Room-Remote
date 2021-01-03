import React, { useRef, useEffect, useState } from "react";
import LightControls from './LightControls';
import { useLocation } from "react-router";
import socketIOClient from "socket.io-client";
import axios from "axios";

const SOCKET_SERVER = "http://localhost:3000";

const SessionPage = () => {
  const location = useLocation();
  const password = location.state.password;
  const [searchTerm, setSearchTerm] = useState("");
  const socketRef = useRef();

  useEffect(() => {
    console.log(password);
    socketRef.current = socketIOClient(SOCKET_SERVER, {
      query: { password },
    });
  }, []);

  function send() {
    console.log(searchTerm);
    axios.post("http://localhost:3000/youtube", { searchTerm: "test" }).then(
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
      Session Page
      <br/>
      {password}
      <br />
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={send}>Send</button>

      <LightControls />
    </div>
  );
};

export default SessionPage;
