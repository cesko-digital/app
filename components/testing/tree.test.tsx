import renderer from "react-test-renderer";
import TestingComponent from "./component";

test("Sample whole-tree test", async () => {
  const component = renderer.create(<TestingComponent name="John Smith" />);
  expect(component.toJSON()).toEqual({
    type: "p",
    props: {
      className: "nice",
    },
    children: ["John Smith"],
  });
});
