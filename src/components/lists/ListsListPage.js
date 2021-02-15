import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as listApi from "../../api/listsApi";

function ListsPage() {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    listApi.getLists().then((_lists) => setLists(_lists));
  }, []);

  return (
    <div>
      <h2>List Page</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Owner</th>
          </tr>
        </thead>
        <tbody>
          {lists.map((list) => {
            return (
              <tr key={list.id}>
                <td>{list.id}</td>
                <td>
                  <Link to={"/list/" + list.id}>{list.name}</Link>
                </td>
                <td>{list.ownerId}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ListsPage;
