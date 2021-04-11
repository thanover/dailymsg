import React from "react";
import { ListOptionsDropdown } from "./listOptionsDropdown";

export default {
  title: "DailyMessage/Lists/ListView/ListOptionsDropdown",
  component: ListOptionsDropdown,
  parameters: {
    layout: "centered",
  },
};

const Template = (args) => <ListOptionsDropdown {...args} />;
export const dropdown = Template.bind({});

dropdown.args = {
  deleteList: () => {},
};
