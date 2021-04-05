import React, { useState, useRef, useEffect } from "react";

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
          <ul className={classPrefix + "-dropdown-menu-list"}>{children}</ul>
        </div>
      )}
    </>
  );
}

export default DropDownMenu;
