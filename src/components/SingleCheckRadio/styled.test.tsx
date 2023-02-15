// import React from "react";
// import renderer from "react-test-renderer";
// import { mockStyles, MockSvg } from "../../mocks";
// import { CheckBox, Radio, Switch } from "./styled";

// const props = {
//   ...mockStyles,
//   name: "test",
//   value: "value",
//   className: "test",
//   label: "test label",
//   disabled: false,
//   toggle: false,
//   checked: false,
//   multiple: false,
//   svg_Checkmark: MockSvg
// };

// describe("CheckBox", () => {
//   it("styles", () => {
//     const wrapper = renderer.create(<CheckBox {...props} />);

//     expect(wrapper).toMatchSnapshot();
//   });

//   it("disabled = true", () => {
//     const wrapper = renderer.create(<CheckBox {...props} disabled={true} />);

//     expect(wrapper).toMatchSnapshot();
//   });

//   it("checked = true", () => {
//     const wrapper = renderer.create(<CheckBox {...props} checked={true} />);

//     expect(wrapper).toMatchSnapshot();
//   });
// });

// describe("Radio", () => {
//   it("styles", () => {
//     const wrapper = renderer.create(<Radio {...props} />);

//     expect(wrapper).toMatchSnapshot();
//   });

//   it("disabled = true", () => {
//     const wrapper = renderer.create(<Radio {...props} disabled={true} />);

//     expect(wrapper).toMatchSnapshot();
//   });

//   it("checked = true", () => {
//     const wrapper = renderer.create(<Radio {...props} checked={true} />);

//     expect(wrapper).toMatchSnapshot();
//   });
// });

// describe("Switch", () => {
//   it("styles", () => {
//     const wrapper = renderer.create(<Switch {...props} />);

//     expect(wrapper).toMatchSnapshot();
//   });

//   it("disabled = true", () => {
//     const wrapper = renderer.create(<Switch {...props} disabled={true} />);

//     expect(wrapper).toMatchSnapshot();
//   });

//   it("checked = true", () => {
//     const wrapper = renderer.create(<Switch {...props} checked={true} />);

//     expect(wrapper).toMatchSnapshot();
//   });
// });
