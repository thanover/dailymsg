import React from "react";

function ListTitleDesc({ name, description }) {
  return (
    <>
      <h1 className="list-name">{name}</h1>
      <p className="list-description">{description}</p>
    </>
  );
}

export default ListTitleDesc;
