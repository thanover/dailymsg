import React from "react";
import { Link } from "react-router-dom";
import MessageItem from "./MessageItem";
import "./messages.css";
import NewMessageModal from "./NewMessageModal";

function MessageList({ list }) {
  return (
    <>
      <div className="messages-container">
        <div className="message-list-header">
          <h4>Messages ({list.messages.items.length})</h4>
          <NewMessageModal />
        </div>
      </div>
    </>
  );
}

export default MessageList;
