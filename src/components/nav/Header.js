import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/dailyMsg_Logo.png";
import NavItem from "./NavItem";
import DropDownMenuItem from "./DropDownMenuItem";

function Header({ user, signOut }) {
  useEffect(() => {}, [user]);

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
          <NavItem>
            <div className="dropdown">
              <ul>
                <li>
                  <DropDownMenuItem>My Profile</DropDownMenuItem>
                </li>
                <li>
                  <DropDownMenuItem onClick={signOut}>Log Out</DropDownMenuItem>
                </li>
              </ul>
            </div>
          </NavItem>
        )}
      </div>
    </div>
  );
}

export default Header;
