import React from "react";
import MessageItem from "./MessageItem";
import "./messages.css";

function MessageList({ messages, deleteMessage, newMessageModal, updateList }) {
  return (
    <>
      <div className="message-list-header">
        {messages.length > 0 ? (
          <h4>Messages ({messages.length})</h4>
        ) : (
          <h2>No Messages, create some messages</h2>
        )}
        {newMessageModal}
      </div>
      <div className="message-container-flex-column">
        <div className="messages-container">
          {messages &&
            messages.map((message, index) => {
              return (
                <MessageItem
                  key={message.id}
                  message={message}
                  deleteMessage={deleteMessage}
                  updateList={updateList}
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
