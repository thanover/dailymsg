import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

function Header({ user, signOut }) {
  const activeStyle = { color: "orange" };
  useEffect(() => {}, [user]);

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <NavLink
              className="nav-link"
              to="/"
              exact
              activeStyle={activeStyle}
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/lists" activeStyle={activeStyle}>
              Lists
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/signin"
              activeStyle={activeStyle}
            >
              SignIn
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="mx-auto order-0">
        <NavLink className="nav-link" to="/" exact>
          DailyMsg
        </NavLink>
      </div>
      <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            {user && (
              <>
                {user.attributes && (
                  <>
                    <div>{user.attributes.email}</div>
                    <button onClick={signOut}>Sign Out</button>
                  </>
                )}
              </>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
