import React from "react";
import { Link } from "react-router-dom";
import MessageItem from "./MessageItem";

function MessageList({ list }) {
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
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {list.id &&
            list.messages.items.map((message) => {
              return (
                <tr key={message.id}>
                  <MessageItem messageId={message.id} list={list} />
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
}

export default MessageList;
