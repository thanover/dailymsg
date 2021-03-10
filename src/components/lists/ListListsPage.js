import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import ListItem from "./ListItem";
import "./Lists.css";

function ListListsPage({ user, checkUser, match }) {
  const activeListId = match.params.id ? match.params.id : null;
  const defaultList = user.lists.items[0] ? user.lists.items[0] : "";

  const [activeList, setActiveList] = useState(defaultList);
  // let history = useHistory();
  // checkUser().then(() => {
  //   if (!user) history.push("/");
  // });

  return (
    <div className="list-page-container">
      <div className="lists-list-container">
        <h3>My Lists</h3>
        {user &&
          user.lists.items.map((list) => {
            return (
              <ListItem
                listId={list.id}
                active={list.id === activeList.id ? true : false}
              />
            );
          })}
        <Link className="btn btn-primary" to="/list">
          Add List
        </Link>
      </div>
    </div>
  );
}

export default ListListsPage;
