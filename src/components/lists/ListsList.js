import { React } from "react";

function ListsList({ newListModal, children }) {
  return (
    <>
      <h2>My Lists</h2>
      <ul>
        {children}
        <li>{newListModal}</li>
      </ul>
    </>
  );
}

export default ListsList;
