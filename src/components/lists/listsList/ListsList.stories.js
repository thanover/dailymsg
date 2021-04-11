import React from "react";
import ListsList from "./ListsList";
import NewListModal from "./newListModal/NewListModal";
import ListItem from "./listItem/ListItem";
import { MemoryRouter } from "react-router-dom";

export default {
  title: "DailyMessage/Lists/ListsList",
  component: ListsList,
  argTypes: {
    active: { control: "boolean" },
  },
};

const user = {
  id: "some-user-id",
};

const list1 = {
  id: "some-list-id",
  name: "Some List Name",
  messages: {
    length: 35,
  },
};

const list2 = {
  id: "another-list-id",
  name: "Another List Name",
  messages: {
    length: 125,
  },
};

const checkUser = () => {};

const Template = (args) => (
  <div
    class="lists-list-container"
    style={{ width: "300px", border: "1px solid grey" }}
  >
    <MemoryRouter>
      <ListsList {...args}>
        <ListItem list={list1} active={false}></ListItem>
        <ListItem list={list2} active={true}></ListItem>
      </ListsList>
    </MemoryRouter>
  </div>
);
export const listsList = Template.bind({});

listsList.args = {
  newListModal: <NewListModal user={user} checkUser={checkUser} />,
  user,
};
