import React from "react";
import { NavLink } from "react-router-dom";
import { NavDropDown } from "./navdropdown/NavDropDown";
import { ReactComponent as EnvelopeIcon } from "../../assets/envelope-regular.svg";

export const Header = ({ user, signedIn, signOut }) => {
  return (
    <div className="header">
      <div className="logo-container">
        <NavLink className="logo-link" to={signedIn ? "/lists" : "/"} exact>
          <EnvelopeIcon />
          {" Daily Message"}
        </NavLink>
      </div>
      <div className="user-options">
        {!signedIn && (
          <NavLink className="nav-link" to="/signin">
            Sign In
          </NavLink>
        )}
        {signedIn && <NavDropDown user={user} signOut={signOut} />}
      </div>
    </div>
  );
};
