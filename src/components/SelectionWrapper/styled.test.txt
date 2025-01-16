// import React from "react";
// import renderer from "react-test-renderer";
// import { mockStyles, MockElement, MockInput, MockSvg } from "../../mocks";
// import { SelectionWrapper } from "./styled";

// it("styles", () => {
//   const wrapper = renderer.create(
//     <SelectionWrapper
//       {...mockStyles}
//       areOptionsOpen={false}
//       SelectionList={<MockElement />}
//       Search={<MockInput />}
//       svg_Expand={MockSvg}
//     />
//   );

//   expect(wrapper).toMatchSnapshot();
// });

// it("styles_disabled = true", () => {
//   const wrapper = renderer.create(
//     <div
//       {...mockStyles}
//       areOptionsOpen={false}
//       SelectionList={<MockElement />}
//       Search={<MockInput />}
//       svg_Expand={MockSvg}
//       styles_disabled={true}
//     />
//   );

//   expect(wrapper).toMatchSnapshot();
// });

// it("areOptionsOpen = true", () => {
//   const wrapper = renderer.create(
//     <SelectionWrapper
//       {...mockStyles}
//       areOptionsOpen={true}
//       SelectionList={<MockElement />}
//       Search={<MockInput />}
//       svg_Expand={MockSvg}
//     />
//   );

//   expect(wrapper).toMatchSnapshot();
// });

// it("styles_hasOptions = false", () => {
//   const wrapper = renderer.create(
//     <SelectionWrapper
//       {...mockStyles}
//       areOptionsOpen={false}
//       SelectionList={<MockElement />}
//       Search={<MockInput />}
//       svg_Expand={MockSvg}
//       styles_hasOptions={false}
//     />
//   );

//   expect(wrapper).toMatchSnapshot();
// });
