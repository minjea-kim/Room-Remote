import React, { useState } from "react";
import { Link } from "react-router-dom";

const AuthenticationError = () => {
  return (
    <div>
      <h1>You are not logged in.</h1>
      <Link to="/">Go Back</Link>
    </div>
  );
};

export default AuthenticationError;
