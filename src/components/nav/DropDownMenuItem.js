import React from "react";

function DropDownMenuItem({ children, onClick }) {
  return (
    <button className="drop-down-menu-item" onClick={onClick}>
      {children}
    </button>
  );
}

export default DropDownMenuItem;
