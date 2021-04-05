import React, { useState, useRef, useEffect } from "react";
import DropDownMenuItem from "../common/DropDownMenuItem";

function DropDownMenu({ btnIcon, btnText, classPrefix, children }) {
  const [open, setOpen] = useState(false);
  const refButton = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      console.log(e);
      if (refButton.current && !refButton.current.contains(e.target)) {
        setOpen(false);
      }
      window.removeEventListener("mouseup", handleOutsideClick);
    };

    if (open) window.addEventListener("mouseup", handleOutsideClick);
  }, [open]);

  return (
    <>
      <div ref={refButton}>
        <button
          className={classPrefix + "-dropdown-btn"}
          onClick={() => setOpen(!open)}
        >
          {btnIcon && <i className={btnIcon}></i>}
          {btnText ? " " + btnText : ""}
        </button>
      </div>
      {open && (
        <div className={classPrefix + "-dropdown-menu"}>
          <ul className={classPrefix + "-dropdown-menu-list"}>
            <DropDownMenuItem classPrefix="nav" id="userEmail">
              thomas.hanover@gmail.com
            </DropDownMenuItem>
            <DropDownMenuItem classPrefix="nav" id="profile">
              My Profile
            </DropDownMenuItem>
            <DropDownMenuItem classPrefix="nav" onClick={() => {}} id="signOut">
              Sign Out
            </DropDownMenuItem>
          </ul>
        </div>
      )}
    </>
  );
}

export default DropDownMenu;
