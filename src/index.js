import "./main.css";
import React from "react";
import { render } from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import Amplify from "aws-amplify";
import config from "./aws-exports";

Amplify.configure(config);

render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
