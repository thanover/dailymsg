import React, { useState, useEffect } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import ConfirmEmailForm from "./ConfirmEmailForm";
import ResetPasswordPage from "./ResetPasswordPage";
import { AuthActions } from "./AuthActions";
import { useHistory } from "react-router-dom";
import { API, graphqlOperation } from "aws-amplify";
import { createUser } from "../../graphql/mutations";
import { getUser } from "../../graphql/queries";
import { Auth } from "aws-amplify";
import "./Auth.css";

function AuthContainer({ setUser, setCognitoUser, authAction }) {
  let history = useHistory();
  let [authForm, setAuthForm] = useState({
    username: "",
    password: "",
    authCode: "",
  });
  let [_authAction, _setAuthAction] = useState(authAction);

  useEffect(() => {
    _setAuthAction(authAction);
  }, [authAction]);

  function onChange(e) {
    e.persist();
    setAuthForm(() => ({ ...authForm, [e.target.name]: e.target.value }));
  }

  async function signUp() {
    const { username, password } = authForm;
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
          _setAuthAction("confirmEmail");
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

  async function confirmEmail() {
    try {
      const { username, authCode, password } = authForm;
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
      const { username, password } = authForm;
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

  async function resendConfirmationCode() {
    try {
      const { username } = authForm;
      await Auth.resendSignUp(username);
      console.log("code resent successfully");
    } catch (err) {
      console.log("error resending code: ", err);
    }
  }

  switch (_authAction) {
    case AuthActions.signIn:
      return (
        <div className="auth-form-container">
          <SignInForm onChange={onChange} signIn={signIn} />
        </div>
      );
    case AuthActions.signUp:
      return (
        <div className="auth-form-container">
          <SignUpForm signUp={signUp} onChange={onChange} />
        </div>
      );
    case AuthActions.confirmEmail:
      return (
        <div className="auth-form-container">
          <ConfirmEmailForm
            confirmEmail={confirmEmail}
            onChange={onChange}
            resendConfirmationCode={resendConfirmationCode}
          />
        </div>
      );
    case AuthActions.resetPassword:
      return (
        <div className="auth-form-container">
          <ResetPasswordPage onChange={onChange} />
        </div>
      );
    default:
      history.push("/");
  }
}

export default AuthContainer;
