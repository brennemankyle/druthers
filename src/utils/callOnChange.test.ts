// import callOnChange from "./callOnChange";
// // import massageDataOut from "./massageDataOut";
// //
// // jest.mock("./massageDataOut");
// // massageDataOut.mockImplementation(() => (_, value) => value);

// let props;
// let expected;

// beforeEach(() => {
//   props = {
//     multiple: false,
//     options: [],
//     selection: [],
//     name: "test",
//     massageDataOut: (_, value) => value,
//     onChange: jest.fn()
//   };

//   expected = {
//     target: {
//       value: [],
//       name: "test"
//     }
//   };
// });

// it("should default", () => {
//   callOnChange(props, [], "add");

//   expect(props.onChange).toBeCalledWith(expected);
// });

// describe("replace", () => {
//   it("should replace", () => {
//     callOnChange(props, ["replacement"], "replace");

//     expected.target.value = ["replacement"];

//     expect(props.onChange).toBeCalledWith(expected);
//   });

//   it("should replace without array", () => {
//     callOnChange(props, "replacement", "replace");

//     expected.target.value = ["replacement"];

//     expect(props.onChange).toBeCalledWith(expected);
//   });
// });

// describe("add", () => {
//   it("should replace, when not multiple", () => {
//     callOnChange(props, ["replacement"], "add");

//     expected.target.value = ["replacement"];

//     expect(props.onChange).toBeCalledWith(expected);
//   });

//   it("should replace, when not multiple without array", () => {
//     callOnChange(props, "replacement", "add");

//     expected.target.value = ["replacement"];

//     expect(props.onChange).toBeCalledWith(expected);
//   });

//   it("should add, when multiple", () => {
//     props.multiple = true;
//     props.selection = [
//       {
//         value: "1",
//         label: "1"
//       }
//     ];
//     props.options = [
//       {
//         value: "1",
//         label: "1"
//       },
//       {
//         value: "2",
//         label: "2"
//       }
//     ];

//     callOnChange(props, "2", "add");

//     expected.target.value = ["1", "2"];

//     expect(props.onChange).toBeCalledWith(expected);
//   });

//   it("should remove child when adding parent", () => {
//     props.multiple = true;
//     props.selection = [
//       {
//         value: "child0.0",
//         label: "child0.0",
//         group: "0.0"
//       },
//       {
//         value: "nothing",
//         label: "nothing"
//       }
//     ];
//     props.options = [
//       {
//         value: "parent",
//         label: "parent",
//         childGroup: "0"
//       },
//       {
//         value: "child0",
//         label: "child0",
//         group: "0",
//         childGroup: "0.0"
//       },
//       {
//         value: "child0.0",
//         label: "child0.0",
//         group: "0.0"
//       },
//       {
//         value: "nothing",
//         label: "nothing"
//       }
//     ];

//     callOnChange(props, "child0", "add");

//     expected.target.value = ["nothing", "child0"];

//     expect(props.onChange).toBeCalledWith(expected);
//   });

//   it("should remove child when adding parent's parent", () => {
//     props.multiple = true;
//     props.selection = [
//       {
//         value: "child0.0",
//         label: "child0.0",
//         group: "0.0"
//       }
//     ];
//     props.options = [
//       {
//         value: "parent",
//         label: "parent",
//         childGroup: "0"
//       },
//       {
//         value: "child0",
//         label: "child0",
//         group: "0",
//         childGroup: "0.0"
//       },
//       {
//         value: "child0.0",
//         label: "child0.0",
//         group: "0.0"
//       }
//     ];

//     callOnChange(props, "parent", "add");

//     expected.target.value = ["parent"];

//     expect(props.onChange).toBeCalledWith(expected);
//   });
// });

// describe("remove", () => {
//   it("should remove", () => {
//     callOnChange(props, ["replacement"], "remove");

//     expect(props.onChange).toBeCalledWith(expected);
//   });

//   it("should remove, without array", () => {
//     callOnChange(props, "replacement", "remove");

//     expect(props.onChange).toBeCalledWith(expected);
//   });

//   it("should remove, when multiple", () => {
//     props.multiple = true;
//     props.selection = [
//       {
//         value: "1",
//         label: "1"
//       },
//       {
//         value: "2",
//         label: "2"
//       }
//     ];

//     callOnChange(props, ["1"], "remove");

//     expected.target.value = ["2"];

//     expect(props.onChange).toBeCalledWith(expected);
//   });
// });
