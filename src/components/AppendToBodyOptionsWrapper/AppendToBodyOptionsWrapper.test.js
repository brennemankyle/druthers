import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import usePlaceAbove from "../../hooks/usePlaceAbove/usePlaceAbove";
import useRefRect from "../../hooks/useRefRect/useRefRect";
import { mockStyles, MockElement, mockItemList } from "../../mocks";
import AppendToBodyOptionsWrapper from "./AppendToBodyOptionsWrapper";

jest.mock("../../hooks/useRefRect/useRefRect");
useRefRect.mockImplementation(() => ({
  bottom: 80,
  height: 80,
  left: 0,
  right: 200,
  top: 0,
  width: 200,
  x: 0,
  y: 600
}));

jest.mock("../../hooks/usePlaceAbove/usePlaceAbove");
usePlaceAbove.mockImplementation(() => false);

it("renders", () => {
  const parentRef = React.createRef();
  const wrapper = mount(
    <AppendToBodyOptionsWrapper
      {...mockStyles}
      className="test"
      parentRef={parentRef}
      filteredOptions={mockItemList}
      StyledAppendToBodyOptionsWrapper={MockElement}
    >
      <MockElement />
    </AppendToBodyOptionsWrapper>
  );

  expect(toJson(wrapper)).toMatchSnapshot();
});

it("forwards ref", () => {
  const parentRef = React.createRef();
  shallow(
    <AppendToBodyOptionsWrapper
      {...mockStyles}
      className="test"
      parentRef={parentRef}
      filteredOptions={[]}
      StyledAppendToBodyOptionsWrapper={MockElement}
    />
  );

  expect(parentRef.current).toBeDefined();
});

it("place above", () => {
  usePlaceAbove.mockImplementation(() => true);

  const parentRef = React.createRef();
  const wrapper = mount(
    <AppendToBodyOptionsWrapper
      {...mockStyles}
      className="test"
      parentRef={parentRef}
      filteredOptions={mockItemList}
      StyledAppendToBodyOptionsWrapper={MockElement}
    >
      <MockElement />
    </AppendToBodyOptionsWrapper>
  );

  expect(toJson(wrapper)).toMatchSnapshot();
});
