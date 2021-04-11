import React from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

export const ListOptionsDropdown = ({ deleteList }) => {
  return (
    <div className="list-options-dropdown">
      <Dropdown>
        <Dropdown.Toggle id="dropdown-custom-1">
          <FontAwesomeIcon icon={faEllipsisH} />
        </Dropdown.Toggle>
        <Dropdown.Menu className="super-colors">
          <Dropdown.Item eventKey="1">Delete</Dropdown.Item>
          <Dropdown.Item eventKey="2">Set Inactive</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
  // return (
  //   <div className="list-options-dropdown">
  //     <DropdownButton
  //       menuAlign="left"
  //       variant="light"
  //       size="small"
  //       id="dropdown-menu-align-right"
  //     >
  //       <Dropdown.Item eventKey="2">Delete</Dropdown.Item>
  //     </DropdownButton>
  //   </div>
  // );
};
