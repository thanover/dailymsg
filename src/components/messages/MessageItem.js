import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API, graphqlOperation } from "aws-amplify";
import { getMessage } from "../../graphql/queries";

function MessageItem({ messageId, index }) {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    API.graphql(graphqlOperation(getMessage, { id: messageId })).then((res) => {
      setMessage(res.data.getMessage);
    });
  }, [messageId]);

  return (
    <div className="message-item">
      {message && (
        <>
          <div className="message-edit"></div>
          <div className="message-text">{message.text}</div>
          <div className="message-send-data">
            Last Sent 30 day(s) ago - Sending in {index} day(s)
          </div>
          <div className="message-author-source">
            <div className="message-authour"></div>
            <div className="message-source"></div>
          </div>
        </>
      )}
    </div>
  );
}

export default MessageItem;
