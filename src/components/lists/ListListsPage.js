import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import ListItem from "./ListItem";

function ListListsPage({ user }) {
  let history = useHistory();
  if (!user) history.push("/");
  const lists = user.lists.items;
  console.log(lists);

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
          </tr>
        </thead>
        <tbody>
          {user &&
            user.lists.items.map((list) => {
              return (
                <tr key={list.id}>
                  <ListItem listId={list.id} />
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default ListListsPage;
