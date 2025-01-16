// import React from "react";
// import renderer from "react-test-renderer";
// import { mockStyles, mockRect } from "../../mocks";
// import { StyledAppendToBodyOptionsWrapper } from "./styled";

// it("styles", () => {
//   const wrapper = renderer.create(
//     <StyledAppendToBodyOptionsWrapper {...mockStyles} parentRect={mockRect} />
//   );

//   expect(wrapper).toMatchSnapshot();
// });

// it("placeOptionsAbove = true", () => {
//   const wrapper = renderer.create(
//     <StyledAppendToBodyOptionsWrapper
//       {...mockStyles}
//       parentRect={mockRect}
//       placeOptionsAbove={true}
//     />
//   );

//   expect(wrapper).toMatchSnapshot();
// });

// it("styles_rightToLeft = true", () => {
//   const wrapper = renderer.create(
//     <StyledAppendToBodyOptionsWrapper
//       {...mockStyles}
//       parentRect={mockRect}
//       styles_rightToLeft={true}
//     />
//   );

//   expect(wrapper).toMatchSnapshot();
// });

// it("styles_hasOptions = false", () => {
//   const wrapper = renderer.create(
//     <StyledAppendToBodyOptionsWrapper
//       {...mockStyles}
//       parentRect={mockRect}
//       styles_hasOptions={false}
//       styles_multiple={false}
//     />
//   );

//   expect(wrapper).toMatchSnapshot();
// });
