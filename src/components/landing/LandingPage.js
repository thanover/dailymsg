import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

function LandingPage() {
  return (
    <div className="landing-page-container">
      <div className="hero">
        <h1>Envoke Thought Daily</h1>
        <p>Get words that inspire sent to your inbox every day</p>
        <div className="landing-btn-container">
          <Link className="btn landing-btn" to="/signup">
            <Button variant="primary">Get Started</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
