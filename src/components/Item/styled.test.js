import React from "react";
import renderer from "react-test-renderer";
import { mockStyles, mockItem, MockSvg } from "../../mocks";
import { Selection, Option } from "./styled";

describe("Selection", () => {
  it("styles", () => {
    const wrapper = renderer.create(
      <Selection
        {...mockStyles}
        item={mockItem}
        removable={false}
        svg_Remove={MockSvg}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it("removable = true", () => {
    const wrapper = renderer.create(
      <Selection
        {...mockStyles}
        item={mockItem}
        removable={true}
        svg_Remove={MockSvg}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it("should highlight removable", () => {
    let mockHighlightedItem = {
      ...mockItem,
      value: "highlight"
    };

    const wrapper = renderer.create(
      <Selection
        {...mockStyles}
        item={mockHighlightedItem}
        styles_selectionHighlighted={mockHighlightedItem.value}
        removable={true}
        svg_Remove={MockSvg}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it("styles_multiple = true", () => {
    const wrapper = renderer.create(
      <Selection
        {...mockStyles}
        item={mockItem}
        styles_multiple={true}
        removable={false}
        svg_Remove={MockSvg}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it("styles_rightToLeft = true", () => {
    const wrapper = renderer.create(
      <Selection
        {...mockStyles}
        item={mockItem}
        styles_rightToLeft={true}
        removable={false}
        svg_Remove={MockSvg}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it("styles_rightToLeft = true and removable = true", () => {
    const wrapper = renderer.create(
      <Selection
        {...mockStyles}
        item={mockItem}
        styles_rightToLeft={true}
        removable={true}
        svg_Remove={MockSvg}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });
});

describe("Option", () => {
  it("styles", () => {
    const wrapper = renderer.create(
      <Option {...mockStyles} item={mockItem} svg_Remove={MockSvg} />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it("should highlight", () => {
    let mockHighlightedItem = {
      ...mockItem,
      value: "highlight"
    };

    const wrapper = renderer.create(
      <Option
        {...mockStyles}
        item={mockHighlightedItem}
        styles_optionHighlighted={mockHighlightedItem.value}
        svg_Remove={MockSvg}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it("should not highlight if empty value", () => {
    let mockHighlightedItem = {
      ...mockItem,
      value: null
    };

    const wrapper = renderer.create(
      <Option
        {...mockStyles}
        item={mockHighlightedItem}
        styles_optionHighlighted={mockHighlightedItem.value}
        svg_Remove={MockSvg}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it("styles_rightToLeft = true", () => {
    const wrapper = renderer.create(
      <Option
        {...mockStyles}
        item={mockItem}
        styles_rightToLeft={true}
        svg_Remove={MockSvg}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it("has item group and parent = true", () => {
    let mockGroupItem = {
      ...mockItem,
      group: "item group",
      parent: true
    };

    const wrapper = renderer.create(
      <Option {...mockStyles} item={mockGroupItem} svg_Remove={MockSvg} />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it("has item group and parent = true and value = null", () => {
    let mockGroupItem = {
      ...mockItem,
      group: "item group",
      parent: true,
      value: null
    };

    const wrapper = renderer.create(
      <Option {...mockStyles} item={mockGroupItem} svg_Remove={MockSvg} />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it("has item group and parent = false", () => {
    let mockGroupItem = {
      ...mockItem,
      group: "item group",
      parent: false
    };

    const wrapper = renderer.create(
      <Option {...mockStyles} item={mockGroupItem} svg_Remove={MockSvg} />
    );

    expect(wrapper).toMatchSnapshot();
  });
});
