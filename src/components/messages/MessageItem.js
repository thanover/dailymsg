import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API, graphqlOperation } from "aws-amplify";
import { getMessage } from "../../graphql/queries";

function MessageItem({ messageId, list }) {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    API.graphql(graphqlOperation(getMessage, { id: messageId })).then((res) => {
      setMessage(res.data.getMessage);
    });
  }, [messageId]);

  return (
    <>
      <td>{messageId}</td>
      {message && (
        <>
          <td>
            <Link to={"/message/" + message.list.id + "/" + message.id}>
              {message.text}
            </Link>
          </td>
          <td>{list.name}</td>
        </>
      )}
    </>
  );
}

export default MessageItem;
