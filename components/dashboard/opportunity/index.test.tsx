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
    const name = 'Anežka Müller';
    const email = 'anezka@cesko.digital';
    
    render(
      <ThemeProvider theme={defaultTheme}>
        <OwnerContact name={name} email={email} />, {}
      </ThemeProvider>
    )

    expect((await screen.findByText(name)).textContent).toBe(name);
    expect((await screen.findByText(email)).getAttribute('href')).toBe(`mailto:${email}`);
  });
  test("Display only name", async () => {
    const name = 'John Smith';
    const email = 'john.smith@example.com';

    render(
      <ThemeProvider theme={defaultTheme}>
        <OwnerContact name={name} email={email} />, {}
      </ThemeProvider>
    )

    expect((await screen.findByText(name)).textContent).toBe(name);
    const el = await screen.queryByText(email);
    expect(el).toBe(null);
  });
});
