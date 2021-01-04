import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./css/youtubepartypage.scss";

const YouTubePartyPage = () => {
  const history = useHistory();
  const [roomID, setRoomID] = useState("");
  const [name, setName] = useState("");

  function joinRoom(event) {
    event.preventDefault();
    console.log(roomID);
    history.push({
      pathname: "/partysession",
      state: { roomID, name },
    });
  }

  return (
    <div className="youtube-party-page">
      <div className="decorator" id="one" />
      <div className="decorator" id="two" />
      <div className="decorator" id="three" />
      <div className="decorator" id="four" />
      <form>
        <h1>
          YouTube
          <br />
          Party
        </h1>

        <label>Room ID</label>
        <input value={roomID} onChange={(e) => setRoomID(e.target.value)} />

        <label>Your Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />

        <button onClick={(event) => joinRoom(event)}>Join Room</button>
      </form>
    </div>
  );
};

export default YouTubePartyPage;
