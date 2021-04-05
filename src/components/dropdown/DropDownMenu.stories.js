import React from "react";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import DropDownMenu from "././DropDownMenu";

export default {
  title: "DropDown",
  component: DropDownMenu,
};

const Template = (args) => <DropDownMenu {...args} />;

export const DropdownMenu = Template.bind({});
DropdownMenu.args = {
  btnIcon: <MoreVertIcon />,
  btnTxt: "button",
  classPrefix: 'nav',
};
