import React from "react";
import renderer from "react-test-renderer";
import { mockStyles, mockItemList, MockElement } from "../../mocks";
import { SelectionList, OptionList } from "./styled";

describe("SelectionList", () => {
  it("styles", () => {
    const wrapper = renderer.create(
      <SelectionList
        {...mockStyles}
        itemList={mockItemList}
        Item={MockElement}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it("styles_multiple = true", () => {
    const wrapper = renderer.create(
      <SelectionList
        {...mockStyles}
        itemList={mockItemList}
        Item={MockElement}
        styles_multiple={true}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });
});

describe("OptionList", () => {
  it("styles", () => {
    const wrapper = renderer.create(
      <OptionList {...mockStyles} itemList={mockItemList} Item={MockElement} />
    );

    expect(wrapper).toMatchSnapshot();
  });
});
