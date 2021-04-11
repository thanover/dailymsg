import React from "react";
import LandingPage from "./LandingPage";
import { MemoryRouter } from "react-router-dom";

export default {
  title: "DailyMessage/LandingPage",
  component: LandingPage,
  parameters: {
    layout: "centered",
  },
};

export const landingPage = () => (
  <MemoryRouter>
    <LandingPage />
  </MemoryRouter>
);
