import React, { useState } from "react";
import { useHistory } from "react-router";

const LandingPage = () => {
  const [roomID, setRoomID] = useState("");

  const history = useHistory();

  function enterRoom() {
    console.log(roomID);
    history.push({
      pathname: "/menu",
      state: { roomID: roomID },
    });
  }
  return (
    <div>
      <h1>
        Room
        <br />
        Remote
      </h1>

      <form>
        <h2>Enter a roomID to start session</h2>
        <input value={roomID} onChange={(e) => setRoomID(e.target.value)} />

        <h2>Enter your name</h2>
        <input />
        <button onClick={enterRoom}>Click</button>
      </form>
    </div>
  );
};

export default LandingPage;
