import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { API, graphqlOperation } from "aws-amplify";
import { createUser } from "../../graphql/mutations";
import { getUser } from "../../graphql/queries";

function SignInPage({ user, setUser, cognitoUser, setCognitoUser, formType }) {
  const initialFormState = {
    username: "",
    password: "",
    authCode: "",
    formType: formType,
  };
  const [formState, updateFormState] = useState(initialFormState);
  // const { formType } = formState;

  let history = useHistory();

  function onChange(e) {
    e.persist();
    updateFormState(() => ({ ...formState, [e.target.name]: e.target.value }));
  }

  async function signUp() {
    const { username, password } = formState;
    try {
      await Auth.signUp({
        username,
        password,
      }).then((_cognitoUser) => {
        setCognitoUser(_cognitoUser);
        console.log(`cognitoUser created: ${_cognitoUser}`);
        console.log(_cognitoUser);
        const newUser = {
          email: _cognitoUser.user.username,
          id: _cognitoUser.userSub,
        };
        addUserToDatabase(newUser).then(() => {
          updateFormState(() => ({ ...formState, formType: "confirmSignUp" }));
        });
      });
    } catch (error) {
      console.log("error signing up:", error);
    }
  }

  async function addUserToDatabase(newUser) {
    try {
      let response = await API.graphql(
        graphqlOperation(createUser, { input: newUser })
      );
      const newUserId = response.data.createUser.id;
      response = await API.graphql(
        graphqlOperation(getUser, { id: newUserId })
      );
      const _user = response.data.getUser;
      setUser(_user);
    } catch (error) {
      console.log("error creating user:", error);
    }
  }

  async function confirmSignUp() {
    try {
      const { username, authCode, password } = formState;
      await Auth.confirmSignUp(username, authCode);
      const _cognitoUser = await Auth.signIn(username, password);
      setCognitoUser(_cognitoUser);
      await getUserFromDatabase(_cognitoUser);
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
      const response = await API.graphql(
        graphqlOperation(getUser, { id: _cognitoUser.username })
      );
      const _user = response.data.getUser;
      setUser(_user);
    } catch (error) {
      console.log(error);
    }
  }

  async function switchToSignUp() {
    updateFormState(() => ({ ...formState, formType: "signUp" }));
  }

  async function resendConfirmationCode() {
    try {
      const { username } = formState;
      await Auth.resendSignUp(username);
      console.log("code resent successfully");
    } catch (err) {
      console.log("error resending code: ", err);
    }
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
          <br></br>
          <br></br>
          <button onClick={resendConfirmationCode}>Resend Code</button>
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
