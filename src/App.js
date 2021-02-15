import React, { useState, useEffect } from "react";
import Header from "./components/nav/Header";
import HomePage from "./components/HomePage";
import { Route, Switch } from "react-router-dom";
import ListsListPage from "./components/lists/ListsListPage";
import ListPage from "./components/lists/ListPage";
import { Auth, Hub } from "aws-amplify";

const initialFormState = {
  username: "",
  password: "",
  authCode: "",
  formType: "signUp",
};

function App() {
  const [formState, updateFormState] = useState(initialFormState);
  const [user, updateUser] = useState(null);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    try {
      const _user = await Auth.currentAuthenticatedUser();
      console.log(_user);
      updateUser(_user);
      updateFormState(() => ({ ...formState, formType: "signedIn" }));
    } catch (err) {
      console.log("user error:", err);
    }
  }

  function onChange(e) {
    e.persist();
    updateFormState(() => ({ ...formState, [e.target.name]: e.target.value }));
  }

  const { formType } = formState;
  async function signUp() {
    const { username, password } = formState;
    try {
      const { user } = await Auth.signUp({
        username,
        password,
      });
      console.log(user);
      updateFormState(() => ({ ...formState, formType: "confirmSignUp" }));
    } catch (error) {
      console.log("error signing up:", error);
    }
  }
  async function confirmSignUp() {
    debugger;
    try {
      const { username, authCode } = formState;
      console.log(authCode);
      await Auth.confirmSignUp(username, authCode);
      updateFormState(() => ({ ...formState, formType: "signIn" }));
    } catch (error) {
      console.log("error confirming", error);
    }
  }

  async function signIn() {
    try {
      const { username, password } = formState;
      await Auth.signIn(username, password);
      updateFormState(() => ({ ...formState, formType: "signedIn" }));
    } catch (error) {
      console.log("error signing in", error);
    }
  }

  async function switchToSignIn() {
    updateFormState(() => ({ ...formState, formType: "signIn" }));
  }

  async function signOut() {
    try {
      Auth.signOut();
      updateFormState(() => ({ ...formState, formType: "signIn" }));
    } catch (error) {
      console.log("error logging out:", error);
    }
  }

  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/lists/" component={ListsListPage} />
        <Route path="/list/:listId" component={ListPage} />
      </Switch>
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
          <button onClick={switchToSignIn}>Sign In</button>
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
        </div>
      )}

      {formType === "signedIn" && (
        <div>
          <h1>Welcome {user.attributes.email}</h1>
          <button onClick={signOut}>Sign Out</button>
        </div>
      )}
    </div>
  );
}

export default App;
