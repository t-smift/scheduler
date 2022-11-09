import React from "react";

import { render, cleanup } from "@testing-library/react";

import Application from "components/Application";
import Appointment from "components/Appointment/index";

describe("Appointment", () => {

  it("rednders without crashing", () => {
    render(<Appointment />);
  })

  
});