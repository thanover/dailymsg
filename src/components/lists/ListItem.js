import React from "react";
import { Link } from "react-router-dom";

function ListItem({ list, active }) {
  return (
    <>
      {list && (
        <li className={active ? "list-item active" : "list-item"}>
          <Link to={"/lists/" + list.id}>
            <i className="far fa-list-alt"></i>
            {" " + list.name}
          </Link>
        </li>
      )}
    </>
  );
}

export default ListItem;
