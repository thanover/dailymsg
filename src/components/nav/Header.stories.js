import React from "react";
import { Header } from "./Header";
import { MemoryRouter } from "react-router-dom";

export default {
  title: "DailyMessage/Nav/NavHeader",
  component: Header,
  argTypes: {
    signedIn: { control: "boolean" },
  },
};

const Template = (args) => (
  <MemoryRouter>
    <Header {...args} />
  </MemoryRouter>
);
export const header = Template.bind({});

header.args = {
  user: {
    email: "thomas.hanover@gmail.com",
  },
  signOut: () => {},
  signedIn: true,
};
