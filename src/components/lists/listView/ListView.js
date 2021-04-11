import React from "react";
import { ListOptions } from "./listOptions/ListOptions";
import { ListNameDesc } from "./listNameDesc/ListNameDesc";
import { MessageList } from "../../messages/MessageListPage";

export const ListView = () => {
  return (
    <div className="list-view">
      <ListNameDesc />
      <ListOptions />
      <MessageList />
    </div>
  );
};
