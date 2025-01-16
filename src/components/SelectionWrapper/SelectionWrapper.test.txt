// import React, { useRef } from "react";
// import { render, fireEvent } from "@testing-library/react";
// import TestRenderer from "react-test-renderer";
// import { mockStyles, MockElement, MockInput, MockSvg } from "../../mocks";
// import SelectionWrapper from "./SelectionWrapper";

// jest.mock("react", () => ({
//   ...jest.requireActual("react"),
//   useRef: jest.fn(),
// }));

// let onFocus = jest.fn();
// let onBlur = jest.fn();

// // This is done internally in the component... but doesn't work appropriately while testing
// useRef.mockImplementation(() => ({
//   current: {
//     focus: onFocus,
//     blur: onBlur,
//   },
// }));

// beforeEach(() => {
//   jest.clearAllMocks();
// });

// it("renders", () => {
//   const testRenderer = TestRenderer.create(
//     <SelectionWrapper
//       {...mockStyles}
//       className="test"
//       areOptionsOpen={false}
//       onFocus={onFocus}
//       onBlur={onBlur}
//       SelectionList={<MockElement />}
//       Search={<MockInput />}
//       svg_Expand={MockSvg}
//     />
//   );

//   expect(testRenderer.toJSON()).toMatchSnapshot();
// });

// it("renders disabled", () => {
//   let styles = {
//     ...mockStyles,
//     styles_disabled: true,
//   };

//   const testRenderer = TestRenderer.create(
//     <SelectionWrapper
//       {...styles}
//       className="test"
//       areOptionsOpen={false}
//       onFocus={onFocus}
//       onBlur={onBlur}
//       SelectionList={<MockElement />}
//       Search={<MockInput />}
//       svg_Expand={MockSvg}
//     />
//   );

//   expect(testRenderer.toJSON()).toMatchSnapshot();
// });

// it("should close", () => {
//   const { getByRole } = render(
//     <SelectionWrapper
//       {...mockStyles}
//       className="test"
//       areOptionsOpen={true}
//       onFocus={onFocus}
//       onBlur={onBlur}
//       SelectionList={<MockElement />}
//       Search={<MockInput />}
//       svg_Expand={MockSvg}
//     />
//   );

//   fireEvent.click(getByRole("textbox"));
//   expect(onBlur).toBeCalled();
// });

// it("should open", () => {
//   const { getByRole } = render(
//     <SelectionWrapper
//       {...mockStyles}
//       className="test"
//       areOptionsOpen={false}
//       onFocus={onFocus}
//       onBlur={onBlur}
//       SelectionList={<MockElement />}
//       Search={<MockInput />}
//       svg_Expand={MockSvg}
//     />
//   );

//   fireEvent.click(getByRole("textbox"));
//   expect(onFocus).toBeCalled();
// });

// it("should do nothing if 'removing'", () => {
//   const { getByRole } = render(
//     <SelectionWrapper
//       {...mockStyles}
//       className="test"
//       areOptionsOpen={false}
//       onFocus={onFocus}
//       onBlur={onBlur}
//       SelectionList={<MockElement />}
//       Search={<MockInput />}
//       svg_Expand={MockSvg}
//     />
//   );
//   const target = document.createElement("div");
//   target.classList.add("remove");

//   fireEvent.click(getByRole("textbox"), { target });
//   expect(onFocus).not.toBeCalled();
//   expect(onBlur).not.toBeCalled();
// });
