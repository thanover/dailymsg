import { React } from "react";

function ListsList({ newListModal, children }) {
  return (
    <>
      <ul>
        <li className="lists-list-header">My Lists</li>
        {children}
      </ul>
      {newListModal}
    </>
  );
}

export default ListsList;
