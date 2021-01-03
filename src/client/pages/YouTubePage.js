import React, { useRef, useEffect, useState } from "react";
import { useLocation } from "react-router";
import socketIOClient from "socket.io-client";
import axios from "axios";

const SOCKET_SERVER = "http://localhost:3000";

const SessionPage = () => {
  const location = useLocation();
  const roomID = location.state.roomID;
  const [searchTerm, setSearchTerm] = useState("");
  const socketRef = useRef();

  // Create Socket connection
  useEffect(() => {
    console.log(roomID);
    socketRef.current = socketIOClient(SOCKET_SERVER, {
      query: { roomID },
    });
  }, []);


  // Search for YouTube Video
  function searchYouTube() {
    console.log(searchTerm);
    axios.post("http://localhost:3000/youtube", { searchTerm: searchTerm }).then(
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
      YouTube Mode
      <br/>
      {roomID}
      <br />
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={searchYouTube}>Send</button>
    </div>
  );
};

export default SessionPage;
