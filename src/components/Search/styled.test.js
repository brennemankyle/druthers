import React from "react";
import renderer from "react-test-renderer";
import { mockStyles } from "../../mocks";
import { Search } from "./styled";

it("styles", () => {
  const wrapper = renderer.create(<Search {...mockStyles} />);

  expect(wrapper).toMatchSnapshot();
});

it("styles_rightToLeft = true", () => {
  const wrapper = renderer.create(
    <Search {...mockStyles} styles_rightToLeft={true} />
  );

  expect(wrapper).toMatchSnapshot();
});

it("hide = true", () => {
  const wrapper = renderer.create(<Search {...mockStyles} hide={true} />);

  expect(wrapper).toMatchSnapshot();
});

it("styles_disabled = true", () => {
  const wrapper = renderer.create(
    <Search {...mockStyles} styles_disabled={true} />
  );

  expect(wrapper).toMatchSnapshot();
});
