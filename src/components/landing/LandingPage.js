import React from "react";
import "./LandingPage.css";
import { NavLink } from "react-router-dom";

function LandingPage() {
  return (
    <div className="landing-page-container">
      <div className="hero">
        <h1>Envoke Thought Daily</h1>
        <p>
          Remember and truely process the words that inspire you with messages
          sent to your inbox every day
        </p>
        <div className="landing-btn-container">
          <NavLink className="btn landing-btn" to="/signup">
            Get Started
          </NavLink>
        </div>

        {/* <button className="btn landing-btn">Get Started</button> */}
      </div>
    </div>
  );
}

export default LandingPage;
