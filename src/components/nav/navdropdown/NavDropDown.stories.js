import React from "react";
import { NavDropDown } from "./NavDropDown";

export default {
  title: "DailyMessage/Nav/NavDropDown",
  component: NavDropDown,
  parameters: {
    layout: "centered",
  },
};

const Template = (args) => <NavDropDown {...args} />;
export const dropdown = Template.bind({});

dropdown.args = {
  user: {
    email: "thomas.hanover@gmail.com",
  },
  signOut: {},
};
