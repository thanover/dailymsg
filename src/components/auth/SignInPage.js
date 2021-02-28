import React, { useState, useEffect } from "react";
import { Auth, Hub } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { createUser, getUserById } from "../../api/userApi";

const initialFormState = {
  username: "",
  password: "",
  authCode: "",
  formType: "signIn",
};

function SignInPage({ user, setUser, cognitoUser, setCognitoUser }) {
  const [formState, updateFormState] = useState(initialFormState);
  const { formType } = formState;

  let history = useHistory();
  // if (user) history.push("/lists");

  function onChange(e) {
    e.persist();
    updateFormState(() => ({ ...formState, [e.target.name]: e.target.value }));
  }

  async function signUp() {
    const { username, password } = formState;
    try {
      setCognitoUser(
        await Auth.signUp({
          username,
          password,
        })
      );
      await addUserToDatabase();
      updateFormState(() => ({ ...formState, formType: "confirmSignUp" }));
    } catch (error) {
      console.log("error signing up:", error);
    }
  }

  async function addUserToDatabase(_cognitoUser) {
    try {
      await createUser({
        email: _cognitoUser.attributes.email,
        id: _cognitoUser.username,
        lists: [],
      });
      setUser(await getUserById(_cognitoUser.username));
    } catch (error) {
      console.log("error creating user:", error);
    }
  }

  async function confirmSignUp() {
    try {
      const { username, authCode, password } = formState;
      await Auth.confirmSignUp(username, authCode);
      setCognitoUser(await Auth.signIn(username, password));
      setUser(await getUserById(cognitoUser.username));
      history.push("/lists");
    } catch (error) {
      console.log("error confirming", error);
    }
  }

  async function signIn() {
    try {
      const { username, password } = formState;
      const _cognitoUser = await Auth.signIn(username, password);
      setCognitoUser(_cognitoUser);
      await getUserFromDatabase(_cognitoUser);
      history.push("/lists");
    } catch (error) {
      console.log("error signing in", error);
    }
  }

  async function getUserFromDatabase(_cognitoUser) {
    try {
      const _user = await getUserById(_cognitoUser.username);
      setUser(_user);
    } catch {
      await addUserToDatabase(_cognitoUser);
    }
  }

  async function switchToSignUp() {
    updateFormState(() => ({ ...formState, formType: "signUp" }));
  }

  return (
    <>
      {formType === "signUp" && (
        <div>
          <input name="username" onChange={onChange} placeholder="username" />
          <input
            name="password"
            type="password"
            onChange={onChange}
            placeholder="password"
          />
          <button onClick={signUp}>Sign Up</button>
        </div>
      )}
      {formType === "confirmSignUp" && (
        <div>
          <input
            name="authCode"
            onChange={onChange}
            placeholder="Confirmation Code"
          />
          <button onClick={confirmSignUp}>Complete Sign Up</button>
        </div>
      )}
      {formType === "signIn" && (
        <div>
          <input name="username" onChange={onChange} placeholder="username" />
          <input
            name="password"
            type="password"
            onChange={onChange}
            placeholder="password"
          />
          <button onClick={signIn}>Sign In</button>
          <div>
            <button onClick={switchToSignUp}>Sign Up</button>
          </div>
        </div>
      )}
    </>
  );
}

export default SignInPage;
