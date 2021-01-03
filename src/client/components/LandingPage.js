import React, { useState } from "react";
import { useHistory } from "react-router";

const LandingPage = () => {
  const [password, setPassword] = useState("");

  const history = useHistory();

  function startSession() {
    console.log(password);
    history.push({
      pathname: "/session",
      state: { password: password },
    });
  }
  return (
    <div>
      <h1>Enter a password to start session</h1>
      <input value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={startSession}>Click</button>
    </div>
  );
};

export default LandingPage;
