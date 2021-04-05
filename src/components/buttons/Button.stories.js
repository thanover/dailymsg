import React from "react";

import { Button } from "./Button";

export default {
  title: "Button",
  component: Button,
  argTypes: {
    color: {
      control: {
        type: "radio",
        options: ["red", "green"],
      },
    },
    size: {
      control: {
        type: "radio",
        options: ["small", "medium", "large"],
      },
    },
  },
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: "Button",
};

export const PrimaryRed = Template.bind({});
PrimaryRed.args = {
  primary: true,
  label: "Button",
  color: "red",
};

export const PrimaryGreen = Template.bind({});
PrimaryGreen.args = {
  primary: true,
  label: "Button",
  color: "green",
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: "Button",
};

export const Large = Template.bind({});
Large.args = {
  size: "large",
  label: "Button",
};

export const Small = Template.bind({});
Small.args = {
  size: "small",
  label: "Button",
};
