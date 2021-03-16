import React from "react";
import ListItem from "./ListItem";
import "./Lists.css";
import NewListModal from "./NewListModal";
import ListViewPage from "./ListViewPage";

function ListPage({ user, checkUser, match }) {
  const activeListId = match.params.id ? match.params.id : null;

  return (
    <>
      <div className="list-page-container">
        <div className="lists-list-container">
          <h2>My Lists</h2>
          <ul>
            {user &&
              user.lists.items.map((list) => {
                return (
                  <ListItem
                    key={list.id}
                    listId={list.id}
                    active={
                      activeListId
                        ? list.id === activeListId
                          ? true
                          : false
                        : false
                    }
                  />
                );
              })}
            <li>
              <NewListModal user={user} checkUser={checkUser} />
            </li>
          </ul>
        </div>

        <ListViewPage activeListId={activeListId} />
      </div>
    </>
  );
}

export default ListPage;
