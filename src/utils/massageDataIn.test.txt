// import massageDataIn from "./massageDataIn";

// let props;
// let expectedProps;
// let funcValueKey = obj => obj["value"];
// let funcLabelKey = obj => obj["label"];
// let funcOptionKey = obj => obj["options"];

// beforeEach(() => {
//   props = {
//     selection: "",
//     options: [],
//     placeholder: "placeholder",
//     allowDuplicates: true,
//     valueKey: funcValueKey,
//     labelKey: funcLabelKey,
//     optionsKey: funcOptionKey
//   };

//   expectedProps = {
//     hasOptionGroups: false,
//     hasOptions: false,
//     hasSelection: false,
//     allowDuplicates: true,
//     selection: [],
//     options: expect.anything(),
//     hierarchicalOptions: expect.anything(),
//     singleNoOptions: false,
//     text_placeholder: "placeholder",
//     valueKey: funcValueKey,
//     labelKey: funcLabelKey,
//     optionsKey: funcOptionKey
//   };
// });

// it("should set text_placeholder from text_placeholder", () => {
//   props.text_placeholder = "text_placeholder";

//   expect(massageDataIn(props)).toStrictEqual({
//     ...expectedProps,
//     text_placeholder: "text_placeholder"
//   });
// });

// it("should set singleNoOptions", () => {
//   props.creatable = true;
//   props.multiple = false;

//   expect(massageDataIn(props)).toStrictEqual({
//     ...expectedProps,
//     creatable: true,
//     multiple: false,
//     singleNoOptions: true
//   });
// });

// describe("selection", () => {
//   it("empty values should always be an array", () => {
//     expect(massageDataIn(props)).toStrictEqual(expectedProps);
//   });

//   it("single value should always be an array of objects", () => {
//     props.selection = "1";

//     expect(massageDataIn(props)).toStrictEqual({
//       ...expectedProps,
//       hasSelection: true,
//       selection: [
//         {
//           label: "1",
//           value: "1"
//         }
//       ]
//     });
//   });

//   it("should always convert to strings", () => {
//     props.selection = [1, 2];

//     expect(massageDataIn(props)).toStrictEqual({
//       ...expectedProps,
//       hasSelection: true,
//       selection: [
//         {
//           label: "1",
//           value: "1"
//         },
//         {
//           label: "2",
//           value: "2"
//         }
//       ]
//     });
//   });

//   it("should hydrate selection from options", () => {
//     props.selection = [1, 2];
//     props.options = [
//       {
//         label: "One",
//         value: "1"
//       },
//       {
//         label: "Two",
//         value: "2"
//       }
//     ];

//     expect(massageDataIn(props)).toStrictEqual({
//       ...expectedProps,
//       hasSelection: true,
//       hasOptions: true,
//       selection: [
//         {
//           label: "One",
//           value: "1"
//         },
//         {
//           label: "Two",
//           value: "2"
//         }
//       ]
//     });
//   });
// });

// describe("option groups", () => {
//   let optionGroups = [
//     {
//       label: "Parent 1",
//       value: "1",
//       options: [
//         {
//           label: "P1 Child 1",
//           value: "p1child1"
//         }
//       ]
//     },
//     {
//       label: "Parent 2 without child options",
//       value: 2
//     },
//     {
//       label: "Parent 3 without value",
//       options: [
//         {
//           label: "P3 Child 1",
//           value: "p3child1"
//         }
//       ]
//     }
//   ];

//   it("should hydrate selection with nested option groups", () => {
//     props.options = optionGroups;
//     props.selection = [1, "p1child1", "2", "created"];

//     expect(massageDataIn(props)).toStrictEqual({
//       ...expectedProps,
//       hasOptionGroups: true,
//       hasOptions: true,
//       hasSelection: true,
//       selection: [
//         {
//           label: "Parent 1",
//           childGroup: "0",
//           value: "1",
//           options: expect.anything()
//         },
//         {
//           group: "0",
//           label: "P1 Child 1",
//           value: "p1child1"
//         },
//         {
//           label: "Parent 2 without child options",
//           value: "2"
//         },
//         {
//           label: "created",
//           value: "created"
//         }
//       ]
//     });
//   });
// });
