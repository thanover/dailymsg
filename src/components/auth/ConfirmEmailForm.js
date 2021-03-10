import React from "react";

function ConfirmEmailForm({ onChange, confirmEmail, resendConfirmationCode }) {
  return (
    <div>
      <input
        name="authCode"
        onChange={onChange}
        placeholder="Confirmation Code"
      />
      <button onClick={confirmEmail}>Complete Sign Up</button>
      <br></br>
      <br></br>
      <button onClick={resendConfirmationCode}>Resend Code</button>
    </div>
  );
}

export default ConfirmEmailForm;
