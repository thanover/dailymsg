import React from "react";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import DropDown from "./DropDown";

export default {
  title: "DropDown",
  component: DropDown,
};

const Template = (args) => <DropDown {...args} />;

export const Dropdown = Template.bind({});
Dropdown.args = {
  icon: <MoreVertIcon />,
  menuOptions: ["Option 1", "Option 2"],
};
