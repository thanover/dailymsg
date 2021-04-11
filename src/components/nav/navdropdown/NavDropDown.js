import React from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

export const NavDropDown = ({ user, signOut }) => {
  return (
    <div className="nav-dropdown">
      <DropdownButton
        menuAlign="right"
        variant="light"
        size="sm"
        title={
          <span>
            <FontAwesomeIcon icon={faUserCircle} />
          </span>
        }
        id="dropdown-menu-align-right"
      >
        <Dropdown.Item eventKey="1" disabled="true">
          {user.email}
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item eventKey="2">Settings</Dropdown.Item>
        <Dropdown.Item onClick={signOut}>Log Out</Dropdown.Item>
      </DropdownButton>
    </div>
  );
};
