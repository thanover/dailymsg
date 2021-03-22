import React from "react";
import { API, graphqlOperation } from "aws-amplify";
import { deleteMessage as gqlDeleteMessage } from "../../graphql/mutations";
import { toast } from "react-toastify";

function MessageItem({ message, index, updateList }) {
  async function deleteMessage() {
    try {
      API.graphql(
        graphqlOperation(gqlDeleteMessage, { input: { id: message.id } })
      ).then((res) => {
        toast.info("Message Deleted");
        updateList();
      });
    } catch (err) {
      console.log("error deleting the message:");
      console.log(err);
    }
  }

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
          <button className="delete-list-btn" onClick={deleteMessage}>
            <i className="far fa-trash-alt"></i>
            {" Delete Message"}
          </button>
        </>
      )}
    </div>
  );
}

export default MessageItem;
