import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as listApi from "../../api/listsApi";
import { useHistory } from "react-router-dom";
import ListItem from "./ListItem";

function ListListsPage({ user }) {
  let history = useHistory();
  if (!user) history.push("/");

  return (
    <div>
      <h2>List Page</h2>
      <Link className="btn btn-primary" to="/list">
        Add List
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Owner</th>
          </tr>
        </thead>
        <tbody>
          {user &&
            user.lists.map((list) => {
              return (
                <tr key={list}>
                  <ListItem listId={list} />
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default ListListsPage;
