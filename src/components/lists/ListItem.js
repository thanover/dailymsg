import React from "react";
import { Link } from "react-router-dom";

function ListItem({ list, active }) {
  return (
    <>
      {list && (
        <Link className="list-btn" to={"/lists/" + list.id}>
          <li className={active ? "list-item active" : "list-item"}>
            <i className="far fa-list-alt"></i>
            {" " + list.name}
          </li>
        </Link>
      )}
    </>
  );
}

export default ListItem;
