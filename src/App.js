import React, { useState, useEffect } from "react";
import Header from "./components/nav/Header";
import HomePage from "./components/HomePage";
import { Route, Switch } from "react-router-dom";
import ListListsPage from "./components/lists/ListListsPage";
import ListEditPage from "./components/lists/ListEditPage";
import { Auth } from "aws-amplify";
import SignInPage from "./components/auth/SignInPage";
import { useHistory } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MessageEditPage from "./components/messages/MessageEditPage";
import { API, graphqlOperation } from "aws-amplify";
import { getUser } from "./graphql/queries";

function App() {
  const [user, setUser] = useState(null);
  const [cognitoUser, setCognitoUser] = useState(null);

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    console.log(cognitoUser);
  }, [cognitoUser]);

  useEffect(() => {
    console.log(user);
  }, [user]);

  let history = useHistory();

  async function checkUser() {
    try {
      const cognitoUser = await Auth.currentAuthenticatedUser();
      setCognitoUser(cognitoUser);
      if (cognitoUser) {
        try {
          API.graphql(
            graphqlOperation(getUser, { id: cognitoUser.username })
          ).then((_user) => {
            setUser(_user.data.getUser);
          });
        } catch (error) {
          console.log(error);
        }
      }
    } catch (err) {
      console.log("user error:", err);
    }
  }

  async function signOut() {
    try {
      Auth.signOut();
      setUser(null);
      setCognitoUser(null);
      history.push("/");
    } catch (error) {
      console.log("error logging out:", error);
    }
  }

  return (
    <div className="container-fluid">
      <ToastContainer autoClose={3000} hideProgressBar />
      <Header user={cognitoUser} signOut={signOut} />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route
          path="/lists"
          render={(props) => <ListListsPage {...props} user={user} />}
        />
        <Route
          path="/list/:id"
          render={(props) => (
            <ListEditPage
              {...props}
              user={user}
              setUser={setUser}
              checkUser={checkUser}
            />
          )}
        />
        <Route
          path="/list/"
          render={(props) => (
            <ListEditPage
              {...props}
              user={user}
              setUser={setUser}
              checkUser={checkUser}
            />
          )}
        />
        <Route
          path="/message/:list/:id"
          render={(props) => (
            <MessageEditPage
              {...props}
              user={user}
              setUser={setUser}
              checkUser={checkUser}
            />
          )}
        />
        <Route
          path="/message/:list"
          render={(props) => (
            <MessageEditPage
              {...props}
              user={user}
              setUser={setUser}
              checkUser={checkUser}
            />
          )}
        />
        <Route
          path="/signin"
          render={(props) => (
            <SignInPage
              {...props}
              user={user}
              setUser={setUser}
              cognitoUser={cognitoUser}
              setCognitoUser={setCognitoUser}
            />
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
