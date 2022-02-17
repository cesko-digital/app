/**
 * @jest-environment jsdom
 */
import { render } from "@testing-library/react";
import TestingComponent from "./component";

test("Sample DOM query test", async () => {
  const { queryByText } = render(<TestingComponent name="John Smith" />);
  expect(queryByText(/John/)).toBeDefined();
  expect(queryByText(/John/)?.className).toBe("nice");
});
