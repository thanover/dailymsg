import React from "react";
import { ListOptions } from "./ListOptions";

const list = {
  name: "some-name",
  sendTime: "2:00 PM",
};

const deleteList = () => {};

export default {
  title: "DailyMessage/Lists/ListView/ListOptions",
  component: ListOptions,
  argTypes: {
    active: { control: "boolean" },
  },
};

const Template = (args) => (
  <div style={{ width: "400px" }}>
    <ListOptions
      isDisabled={false}
      deleteList={deleteList}
      sendHour={"2:00 PM"}
    />
  </div>
);

export const listOptions = Template.bind({});

listOptions.args = {
  list,
  deleteList,
};
