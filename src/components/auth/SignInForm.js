import React, { useEffect } from "react";

function SignInForm({ onChange, signIn }) {
  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        signIn();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [signIn]);

  return (
    <>
      <div className="input-container">
        <label>Email:</label>
        <input name="username" onChange={onChange} />
      </div>

      <div className="input-container">
        <label>Password:</label>
        <input name="password" type="password" onChange={onChange} />
      </div>

      <button className="btn" onClick={signIn}>
        Sign In
      </button>
    </>
  );
}

export default SignInForm;
