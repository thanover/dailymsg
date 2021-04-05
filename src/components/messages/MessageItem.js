import React from "react";
import { API, graphqlOperation } from "aws-amplify";
import { deleteMessage as gqlDeleteMessage } from "../../graphql/mutations";
import { toast } from "react-toastify";
import DropDownMenu from "../common/DropDownMenu";
import DropDownMenuItem from "../common/DropDownMenuItem";
import DropDownMenu2 from "../common/DropDownMenu2";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Link from "@material-ui/core/Link";
import DeleteIcon from "@material-ui/icons/Delete";

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
          <DropDownMenu2
            icon={<MoreVertIcon />}
            menuOptions={[
              <Link onClick={deleteMessage}>
                <DeleteIcon />
              </Link>,
            ]}
          ></DropDownMenu2>
        </>
      )}
    </div>
  );
}

export default MessageItem;
