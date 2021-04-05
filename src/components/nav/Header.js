import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/dailyMsg_Logo.png";
import DropDownMenuItem from "../common/DropDownMenuItem";
import DropDownMenu from "../common/DropDownMenu";

function Header({ user, signOut }) {
  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="header">
      <div className="logo">
        <NavLink className="logo-link" to={user ? "/lists" : "/"} exact>
          <img src={logo} alt="logo" />
        </NavLink>
      </div>

      <div className="nav-items">
        {!user && (
          <NavLink className="nav-link" to="/signin">
            Sign In
          </NavLink>
        )}
        {user && (
          <DropDownMenu btnIcon="far fa-user-circle" classPrefix="nav">
            <DropDownMenuItem classPrefix="nav" id="userEmail">
              {user.email}
            </DropDownMenuItem>
            <DropDownMenuItem classPrefix="nav" id="profile">
              My Profile
            </DropDownMenuItem>
            <DropDownMenuItem classPrefix="nav" onClick={signOut} id="signOut">
              Sign Out
            </DropDownMenuItem>
          </DropDownMenu>
        )}
      </div>
    </div>
  );
}

export default Header;
