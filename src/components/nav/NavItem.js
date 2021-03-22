import React, { useState } from "react";

function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="nav-item-btn" onClick={() => setOpen(!open)}>
        <i className="fas fa-ellipsis-v"></i>
      </button>
      {open && props.children}
    </>
  );
}

export default NavItem;
