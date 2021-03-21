import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Auth } from "aws-amplify";
import { API, graphqlOperation } from "aws-amplify";
import { getUser } from "./graphql/queries";
import { AuthActions } from "./components/auth/AuthActions";
import Modal from "react-modal";
import Header from "./components/nav/Header";
import LandingPage from "./components/landing/LandingPage";
import ListPage from "./components/lists/ListPage";
import AuthContainer from "./components/auth/AuthContainer";
import MessageEditPage from "./components/messages/MessageEditPage";
import "react-toastify/dist/ReactToastify.css";

Modal.setAppElement("#root");

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
      } else {
        history.push("./");
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
    <div className="grid">
      <ToastContainer autoClose={3000} hideProgressBar />
      <Header user={cognitoUser} signOut={signOut} />
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route
          path="/lists/:listid"
          render={(props) => (
            <ListPage
              {...props}
              user={user}
              setUser={setUser}
              checkUser={checkUser}
            />
          )}
        />
        <Route
          path="/lists"
          render={(props) => (
            <ListPage {...props} user={user} checkUser={checkUser} />
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
            <AuthContainer
              {...props}
              setUser={setUser}
              setCognitoUser={setCognitoUser}
              authAction={AuthActions.signIn}
            />
          )}
        />
        <Route
          path="/signup"
          render={(props) => (
            <AuthContainer
              {...props}
              setUser={setUser}
              setCognitoUser={setCognitoUser}
              authAction={AuthActions.signUp}
            />
          )}
        />
        <Route
          path="/confirmemail"
          render={(props) => (
            <AuthContainer
              {...props}
              setUser={setUser}
              setCognitoUser={setCognitoUser}
              authAction={AuthActions.confirmEmail}
            />
          )}
        />
      </Switch>
      {/* <Footer></Footer> */}
    </div>
  );
}

export default App;
