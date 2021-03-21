import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import ListsList from "./ListsList";
import NewListModal from "./NewListModal";
import ListItem from "./ListItem";
import ListTitleDesc from "./ListTitleDesc";
import ListOptions from "./ListOptions";
import MessageList from "../messages/MessageListPage";
import { API, graphqlOperation } from "aws-amplify";
import { getList } from "../../graphql/queries";
import "./Lists.css";

function ListPage2({ user, checkUser }) {
  const [lists, setLists] = useState(null);

  const { listid: activeListId } = useParams();
  const [activeList, setActiveList] = useState(null);
  const [messages, setMessages] = useState(null);

  const history = useHistory();

  useEffect(() => {
    if (user) {
      setLists(user.lists.items);
    }
  }, [user]);

  useEffect(() => {
    if (activeListId) {
      API.graphql(graphqlOperation(getList, { id: activeListId })).then(
        (res) => {
          const _activeList = res.data.getList;
          setActiveList(_activeList);
          setMessages(_activeList.messages.items);
        }
      );
    }
  }, [activeListId]);

  return (
    <div className="list-page-container">
      <div className="lists-list-container">
        <ListsList
          newListModal={<NewListModal user={user} checkUser={checkUser} />}
        >
          {lists &&
            lists.map((list) => {
              return (
                <ListItem
                  key={list.id}
                  list={list}
                  active={activeListId && activeListId === list.id}
                />
              );
            })}
        </ListsList>
      </div>
      <div className="list-view-container">
        {activeList ? (
          <>
            <div className="list-title-description">
              <ListTitleDesc
                name={activeList.name}
                description={activeList.description}
              ></ListTitleDesc>
            </div>
            <div className="list-options">
              <ListOptions
                sendHour={activeList.sendHour}
                isDisabled={activeList.isDisabled}
              ></ListOptions>
            </div>
            <MessageList
              messages={messages}
              checkUser={checkUser}
              // updateList={updateList}
            ></MessageList>
          </>
        ) : (
          <div className="list-title-description">
            <ListTitleDesc
              name={"No List Selected"}
              description={""}
            ></ListTitleDesc>
          </div>
        )}
      </div>
    </div>
  );
}

export default ListPage2;
