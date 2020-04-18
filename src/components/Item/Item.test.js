import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import { mockStyles, mockItem, MockSvg } from "../../mocks";
import Item from "./Item";
// import { Selection, Option } from "./styled";

it("renders", () => {
  const wrapper = shallow(
    <Item
      {...mockStyles}
      item={mockItem}
      removable={false}
      svg_Remove={MockSvg}
    />
  );

  expect(toJson(wrapper)).toMatchSnapshot();
});

it("renders removable", () => {
  const wrapper = shallow(
    <Item
      {...mockStyles}
      item={mockItem}
      removable={true}
      svg_Remove={MockSvg}
    />
  );

  expect(toJson(wrapper)).toMatchSnapshot();
});
//
// it("renders styled Selection", () => {
//   const wrapper = mount(
//     <Selection
//       {...mockStyles}
//       item={mockItem}
//       removable={false}
//       svg_Remove={MockSvg}
//     />
//   );
//
//   expect(toJson(wrapper)).toMatchSnapshot();
// });
//
// it("renders styled Selection removable", () => {
//   const wrapper = mount(
//     <Selection
//       {...mockStyles}
//       item={mockItem}
//       removable={true}
//       svg_Remove={MockSvg}
//     />
//   );
//
//   expect(toJson(wrapper)).toMatchSnapshot();
// });
//
// it("renders styled Selection removable", () => {
//   const wrapper = mount(
//     <Selection
//       {...mockStyles}
//       item={mockItem}
//       removable={true}
//       svg_Remove={MockSvg}
//     />
//   );
//
//   expect(toJson(wrapper)).toMatchSnapshot();
// });
//
// it("renders styled Selection removable", () => {
//   const wrapper = mount(
//     <Selection
//       {...mockStyles}
//       item={mockItem}
//       removable={true}
//       svg_Remove={MockSvg}
//     />
//   );
//
//   expect(toJson(wrapper)).toMatchSnapshot();
// });
