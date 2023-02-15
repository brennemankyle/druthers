// import React, { useRef } from "react";
// import { render } from "@testing-library/react";
// import TestRenderer from "react-test-renderer";
// import Druthers from "./Druthers";
// import { MockElement } from "../../mocks";
// import defaultProps from "../../utils/defaultProps";

// global.console.error = jest.fn();

// jest.mock("react", () => ({
//   ...jest.requireActual("react"),
//   useRef: jest.fn(),
// }));

// const massageDataIn = jest.fn().mockImplementation(defaultProps.massageDataIn);
// let otherProps;

// beforeEach(() => {
//   jest.clearAllMocks();

//   otherProps = {
//     component_Select: (props) => <div type="Select" data-props={props} />,
//     component_CheckRadio: (props) => (
//       <div type="CheckRadio" data-props={props} />
//     ),
//     component_CheckBox: MockElement,
//     component_Radio: MockElement,
//     component_Switch: MockElement,
//     options: [{ value: "1", label: "option" }],
//     creatable: true,
//   };

//   useRef.mockImplementation(() => ({
//     current: {
//       scrollWidth: 100,
//       offsetWidth: 101,
//     },
//   }));
// });

// describe("should render Select", () => {
//   beforeEach(() => {
//     otherProps.creatable = false;
//   });

//   it("when creatable", () => {
//     const testRenderer = TestRenderer.create(
//       <Druthers {...defaultProps} {...otherProps} creatable={true} />
//     );

//     expect(testRenderer.toJSON()).toMatchSnapshot();
//   });

//   it("when checkRadioMaxCount is less", () => {
//     const testRenderer = TestRenderer.create(
//       <Druthers {...defaultProps} {...otherProps} checkRadioMaxCount={0} />
//     );

//     expect(testRenderer.toJSON()).toMatchSnapshot();
//   });

//   it("when hasOptionGroups", () => {
//     const optionGroups = [
//       {
//         value: "1",
//         label: "option",
//         options: [{ value: "2", label: "child" }],
//       },
//     ];
//     const testRenderer = TestRenderer.create(
//       <Druthers {...defaultProps} {...otherProps} options={optionGroups} />
//     );

//     expect(testRenderer.toJSON()).toMatchSnapshot();
//   });

//   it("when overflown, with invisible CheckRadio", (done) => {
//     useRef.mockImplementation(() => ({
//       current: {
//         scrollWidth: 101,
//         offsetWidth: 100,
//       },
//     }));

//     const testRenderer = TestRenderer.create(
//       <Druthers {...defaultProps} {...otherProps} />
//     );

//     setTimeout(() => {
//       expect(testRenderer.toJSON()).toMatchSnapshot();
//       done();
//     });
//   });
// });

// describe("should render CheckRadio", () => {
//   it("when not creatable", () => {
//     const testRenderer = TestRenderer.create(
//       <Druthers {...defaultProps} {...otherProps} creatable={false} />
//     );

//     expect(testRenderer.toJSON()).toMatchSnapshot();
//   });

//   it("when not overflown", (done) => {
//     const testRenderer = TestRenderer.create(
//       <Druthers {...defaultProps} {...otherProps} creatable={false} />
//     );

//     setTimeout(() => {
//       expect(testRenderer.toJSON()).toMatchSnapshot();
//       done();
//     });
//   });
// });

// it("should call massageDataIn", () => {
//   render(
//     <Druthers {...defaultProps} {...otherProps} massageDataIn={massageDataIn} />
//   );

//   expect(massageDataIn).toBeCalled();
// });

// it("should console error with no options and not creatable", () => {
//   render(
//     <Druthers
//       {...defaultProps}
//       {...otherProps}
//       options={[]}
//       creatable={false}
//     />
//   );

//   expect(global.console.error).toBeCalledWith(
//     "Select has no options and is not creatable, nothing to display. Consider adding options or making it creatable"
//   );
// });

// it("should not console error with no options and creatable", () => {
//   render(<Druthers {...defaultProps} {...otherProps} options={[]} />);

//   expect(global.console.error).not.toBeCalled();
// });
