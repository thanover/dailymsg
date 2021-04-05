import React from "react";

function DropDownMenuItem({ children, onClick, classPrefix, id }) {
  return (
    <li className={classPrefix + "-dropdown-menu-list-item"} id={id}>
      <button
        className={classPrefix + "-dropdown-menu-item-btn"}
        onClick={onClick}
      >
        {children}
      </button>
    </li>
  );
}

export default DropDownMenuItem;
