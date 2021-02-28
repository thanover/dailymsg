import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import MessageItem from "./MessageItem";

function MessageList({ list, user }) {
  let history = useHistory();
  if (!user) history.push("/");
  return (
    <>
      <Link className="btn btn-primary" to={`/message/${list.id}`}>
        Add Message
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>List</th>
          </tr>
        </thead>
        <tbody>
          {list.id &&
            list.messages.map((message) => {
              return (
                <tr key={message}>
                  <MessageItem messageId={message} list={list} />
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
}

export default MessageList;
