import React from "react";

function SignUpForm({ onChange, signUp }) {
  return (
    <>
      <div className="input-container">
        <label>Email:</label>
        <input name="username" onChange={onChange} />
      </div>

      <div className="input-container">
        <label>Password</label>
        <input name="password" type="password" onChange={onChange} />
      </div>

      <button className="btn" onClick={signUp}>
        Sign Up
      </button>
    </>
  );
}

export default SignUpForm;
