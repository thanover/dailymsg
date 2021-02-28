import React, { useState, useEffect } from "react";
import * as messageApi from "../../api/messagesApi";
import { Link } from "react-router-dom";

function MessageItem({ messageId, list }) {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    messageApi.getMessageById(messageId).then((message) => setMessage(message));
  }, [messageId]);

  return (
    <>
      <td>{messageId}</td>
      {message && (
        <>
          <td>
            <Link to={"/message/" + message.list + "/" + message.id}>
              {message.name}
            </Link>
          </td>
          <td>{list.name}</td>
        </>
      )}
    </>
  );
}

export default MessageItem;
