import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import usePlaceAbove from "../../hooks/usePlaceAbove/usePlaceAbove";
import { mockStyles, MockElement, mockItemList } from "../../mocks";
import AppendToBodyOptionsWrapper from "./AppendToBodyOptionsWrapper";

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
