// import React from "react";
// import renderer from "react-test-renderer";
// import { mockStyles, mockItem, MockSvg } from "../../mocks";
// import { Selection, Option } from "./styled";

// describe("Selection", () => {
//   it("styles", () => {
//     const wrapper = renderer.create(
//       <Selection
//         {...mockStyles}
//         item={mockItem}
//         removable={false}
//         svg_Remove={MockSvg}
//       />
//     );

//     expect(wrapper).toMatchSnapshot();
//   });

//   it("removable = true", () => {
//     const wrapper = renderer.create(
//       <Selection
//         {...mockStyles}
//         item={mockItem}
//         removable={true}
//         svg_Remove={MockSvg}
//       />
//     );

//     expect(wrapper).toMatchSnapshot();
//   });

//   it("should highlight removable", () => {
//     let mockHighlightedItem = {
//       ...mockItem,
//       value: "highlight"
//     };

//     const wrapper = renderer.create(
//       <Selection
//         {...mockStyles}
//         item={mockHighlightedItem}
//         styles_selectionHighlighted={mockHighlightedItem.value}
//         removable={true}
//         svg_Remove={MockSvg}
//       />
//     );

//     expect(wrapper).toMatchSnapshot();
//   });

//   it("styles_multiple = true", () => {
//     const wrapper = renderer.create(
//       <Selection
//         {...mockStyles}
//         item={mockItem}
//         styles_multiple={true}
//         removable={false}
//         svg_Remove={MockSvg}
//       />
//     );

//     expect(wrapper).toMatchSnapshot();
//   });

//   it("styles_rightToLeft = true", () => {
//     const wrapper = renderer.create(
//       <Selection
//         {...mockStyles}
//         item={mockItem}
//         styles_rightToLeft={true}
//         removable={false}
//         svg_Remove={MockSvg}
//       />
//     );

//     expect(wrapper).toMatchSnapshot();
//   });

//   it("styles_rightToLeft = true and removable = true", () => {
//     const wrapper = renderer.create(
//       <Selection
//         {...mockStyles}
//         item={mockItem}
//         styles_rightToLeft={true}
//         removable={true}
//         svg_Remove={MockSvg}
//       />
//     );

//     expect(wrapper).toMatchSnapshot();
//   });
// });

// describe("Option", () => {
//   it("styles", () => {
//     const wrapper = renderer.create(
//       <Option {...mockStyles} item={mockItem} svg_Remove={MockSvg} />
//     );

//     expect(wrapper).toMatchSnapshot();
//   });

//   it("should highlight", () => {
//     let mockHighlightedItem = {
//       ...mockItem,
//       value: "highlight"
//     };

//     const wrapper = renderer.create(
//       <Option
//         {...mockStyles}
//         item={mockHighlightedItem}
//         styles_optionHighlighted={mockHighlightedItem.value}
//         svg_Remove={MockSvg}
//       />
//     );

//     expect(wrapper).toMatchSnapshot();
//   });

//   it("should not highlight if empty value", () => {
//     let mockHighlightedItem = {
//       ...mockItem,
//       value: null
//     };

//     const wrapper = renderer.create(
//       <Option
//         {...mockStyles}
//         item={mockHighlightedItem}
//         styles_optionHighlighted={mockHighlightedItem.value}
//         svg_Remove={MockSvg}
//       />
//     );

//     expect(wrapper).toMatchSnapshot();
//   });

//   it("styles_rightToLeft = true", () => {
//     const wrapper = renderer.create(
//       <Option
//         {...mockStyles}
//         item={mockItem}
//         styles_rightToLeft={true}
//         svg_Remove={MockSvg}
//       />
//     );

//     expect(wrapper).toMatchSnapshot();
//   });

//   it("has item group and childGroup = 0", () => {
//     let mockGroupItem = {
//       ...mockItem,
//       childGroup: "0"
//     };

//     const wrapper = renderer.create(
//       <Option {...mockStyles} item={mockGroupItem} svg_Remove={MockSvg} />
//     );

//     expect(wrapper).toMatchSnapshot();
//   });

//   it("has item group and childGroup = 0.0.0", () => {
//     let mockGroupItem = {
//       ...mockItem,
//       childGroup: "0.0.0"
//     };

//     const wrapper = renderer.create(
//       <Option {...mockStyles} item={mockGroupItem} svg_Remove={MockSvg} />
//     );

//     expect(wrapper).toMatchSnapshot();
//   });

//   it("has item group and childGroup = 0 and value = null", () => {
//     let mockGroupItem = {
//       ...mockItem,
//       childGroup: "0",
//       value: null
//     };

//     const wrapper = renderer.create(
//       <Option {...mockStyles} item={mockGroupItem} svg_Remove={MockSvg} />
//     );

//     expect(wrapper).toMatchSnapshot();
//   });

//   it("has item group and no childGroup", () => {
//     let mockGroupItem = {
//       ...mockItem,
//       group: "0"
//     };

//     const wrapper = renderer.create(
//       <Option {...mockStyles} item={mockGroupItem} svg_Remove={MockSvg} />
//     );

//     expect(wrapper).toMatchSnapshot();
//   });
// });
