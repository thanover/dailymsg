import React, { useState, useEffect, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import ListsList from "./listsList/ListsList";
import NewListModal from "./listsList/newListModal/NewListModal";
import ListItem from "./listsList/listItem/ListItem";
import ListTitleDesc from "./ListTitleDesc";
import { ListOptions } from "./listView/listOptions/ListOptions";
import MessageList from "../messages/MessageListPage";
import NewMessageModal from "../messages/NewMessageModal";
import { API, graphqlOperation } from "aws-amplify";
import { getList } from "../../graphql/queries";
import "./Lists.css";
import {
  deleteList as gqlDeleteList,
  deleteMessage as gqlDeleteMessage,
} from "../../graphql/mutations";

function ListPage({ user, checkUser }) {
  const [lists, setLists] = useState(null);

  const { listid: activeListId } = useParams();
  const [activeList, setActiveList] = useState(null);
  const [messages, setMessages] = useState(null);
  const history = useHistory();
  const mountedRef = useRef(true);

  useEffect(() => {
    if (user) setLists(user.lists.items);
  }, [user]);

  useEffect(() => {
    if (activeListId) {
      console.log(`activeListId: ${activeListId}`);
      if (activeList) console.log(`activeList.id: ${activeList.id}`);
      if (activeList && activeListId === activeList.id) {
        return null;
      }
      updateList();
    } else {
      setActiveList(null);
    }
  }, [activeListId]);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  async function updateList() {
    console.log("triggered update");
    try {
      API.graphql(graphqlOperation(getList, { id: activeListId })).then(
        (res) => {
          if (!mountedRef.current) return null;
          const _activeList = res.data.getList;
          setActiveList(_activeList);
          setMessages(_activeList.messages.items);
        }
      );
    } catch (err) {
      console.log("error getting a list:");
      console.log(err);
    }
  }

  async function deleteList() {
    try {
      API.graphql(
        graphqlOperation(gqlDeleteList, { input: { id: activeListId } })
      ).then((res) => {
        toast.info("List Deleted");
        setActiveList(null);
        checkUser();
        history.push("/lists");
      });
    } catch (err) {
      console.log("error deleting the list:");
      console.log(err);
    }
  }

  async function deleteMessage(messageId) {
    try {
      API.graphql(
        graphqlOperation(gqlDeleteMessage, { input: { id: messageId } })
      ).then((res) => {
        toast.info("Message Deleted");
        setActiveList(null);
        checkUser();
        history.push("/lists");
      });
    } catch (err) {
      console.log("error deleting the message:");
      console.log(err);
    }
  }

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
                  listId={list.id}
                  active={activeListId && activeListId === list.id}
                  setActiveList={setActiveList}
                  activeList={activeList}
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
                deleteList={deleteList}
              ></ListOptions>
            </div>
            {messages && (
              <MessageList
                messages={messages}
                deleteMessage={deleteMessage}
                updateList={updateList}
                newMessageModal={
                  <NewMessageModal
                    list={activeList}
                    checkUser={checkUser}
                    setActiveList={setActiveList}
                    updateList={updateList}
                  />
                }
              ></MessageList>
            )}
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

export default ListPage;
