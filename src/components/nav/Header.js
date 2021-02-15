import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  const activeStyle = { color: "orange" };
  return (
    <nav>
      <NavLink to="/" exact activeStyle={activeStyle}>
        Home
      </NavLink>
      {" | "}
      <NavLink to="/lists" activeStyle={activeStyle}>
        Lists
      </NavLink>
    </nav>
  );
}

export default Header;
