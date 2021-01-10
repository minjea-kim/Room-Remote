import React, { useState } from "react";
import { Link } from "react-router-dom";
import './css/authenticationerror.scss';

const AuthenticationError = () => {
  return (
    <div className="authentication-error">
      <h1>You are not logged in.</h1>
      <Link to="/">Log In</Link>
    </div>
  );
};

export default AuthenticationError;
