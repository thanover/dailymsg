import React, { useState, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { getList } from "../../graphql/queries";
import MessageList from "../messages/MessageListPage";

function ListViewPage({ activeListId }) {
  const [list, setList] = useState(null);

  useEffect(() => {
    if (activeListId) {
      API.graphql(graphqlOperation(getList, { id: activeListId })).then(
        (res) => {
          setList(res.data.getList);
          console.log(res.data.getList);
        }
      );
    }
  }, [activeListId]);

  return (
    <div className="list-view-container">
      {list && (
        <>
          <div className="list-title-description">
            <h1 className="list-name">{list.name}</h1>
            <p className="list-description">{list.description}</p>
          </div>
          <div className="list-options">
            <label htmlFor="send-hour">Send Hour:</label>
            <select
              id="list-options"
              name="list-options"
              size="1"
              value={list.sendHour}
              onChange={null}
            >
              <option value="01:00">01:00</option>
              <option value="02:00">02:00</option>
              <option value="03:00">03:00</option>
              <option value="04:00">04:00</option>
              <option value="08:00">08:00</option>
            </select>
            <p className="isDisabled">
              {list.isDisabled ? "Disabled" : "Active"}
            </p>
          </div>
          <MessageList list={list}></MessageList>
        </>
      )}
      {!list && (
        <>
          <h1 className="list-name">No List Selected</h1>
        </>
      )}
    </div>
  );
}

export default ListViewPage;
