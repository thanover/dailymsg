import React from "react";
import MessageItem from "./MessageItem";
import "./messages.css";
import NewMessageModal from "./NewMessageModal";

function MessageList({ list, messages }) {
  return (
    <>
      <div className="message-list-header">
        {messages &&
          (messages.length > 0 ? (
            <h4>Messages ({messages.length})</h4>
          ) : (
            <h2>No Messages, create some messages</h2>
          ))}

        <NewMessageModal list={list} />
      </div>
      <div className="message-container-flex-column">
        <div className="messages-container">
          {messages &&
            messages.map((message, index) => {
              return (
                <MessageItem
                  key={message.id}
                  messageId={message.id}
                  index={index + 1}
                />
              );
            })}
        </div>
      </div>
    </>
  );
}

export default MessageList;
