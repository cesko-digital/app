/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";

// See https://stackoverflow.com/a/58302876
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from "components/theme/default";

import OwnerContact from "./index";

describe("When displaying opportunity owner", () => {
  test("Display email link", async () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <OwnerContact name='John Smith' email='john.smith@example.com' />, {}
      </ThemeProvider>
    )
    // screen.debug()
    expect((await screen.findByText('John Smith')).textContent).toBe('John Smith');
    expect((await screen.findByText('John Smith')).getAttribute('href')).toBe('mailto:john.smith@example.com');
  });
});
