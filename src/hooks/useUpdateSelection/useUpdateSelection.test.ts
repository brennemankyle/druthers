// import { renderHook } from "@testing-library/react";
// import callOnChange from "../../utils/callOnChange";
// import useUpdateSelection, {
//   allBooleanValues,
//   isBooleanSwitch,
// } from "./useUpdateSelection";

// jest.mock("../../utils/callOnChange");
// callOnChange.mockImplementation(jest.fn());

// let isCheckRadio;
// let props;

// beforeEach(() => {
//   isCheckRadio = false;
//   props = {
//     selection: [],
//     options: [],
//     massageDataOut: (_, value) => value,
//     onChange: jest.fn(),
//     allowDuplicates: true,
//     multiple: true,
//     parseTo: "string",
//   };

//   jest.clearAllMocks();
// });

// it("Should default", () => {
//   renderHook(() => useUpdateSelection(props, isCheckRadio));

//   expect(callOnChange).toBeCalledWith(props, [], "replace");
// });

// describe("allowDuplicates", () => {
//   let withDuplicates = [
//     {
//       value: "1",
//       label: "dup",
//     },
//     {
//       value: "1",
//       label: "dup",
//     },
//     {
//       value: "1",
//       label: "dup",
//     },
//     {
//       value: "2",
//       label: "other",
//     },
//   ];
//   let options = [
//     {
//       value: "1",
//       label: "dup",
//     },
//     {
//       value: "2",
//       label: "other",
//     },
//   ];

//   it("Should allow duplicates", () => {
//     props.selection = withDuplicates;
//     props.options = options;

//     renderHook(() => useUpdateSelection(props, isCheckRadio));

//     expect(callOnChange).toBeCalledWith(props, ["1", "1", "1", "2"], "replace");
//   });

//   it("Should not allow duplicates", () => {
//     props.selection = withDuplicates;
//     props.options = options;
//     props.allowDuplicates = false;

//     renderHook(() => useUpdateSelection(props, isCheckRadio));

//     expect(callOnChange).toBeCalledWith(props, ["1", "2"], "replace");
//   });
// });

// describe("single selection", () => {
//   let selection = [
//     {
//       value: "1",
//       label: "dup",
//     },
//     {
//       value: "2",
//       label: "other",
//     },
//   ];
//   let options = [
//     {
//       value: "1",
//       label: "dup",
//     },
//     {
//       value: "2",
//       label: "other",
//     },
//   ];

//   it("Should allow multiple", () => {
//     props.selection = selection;
//     props.options = options;

//     renderHook(() => useUpdateSelection(props, isCheckRadio));

//     expect(callOnChange).toBeCalledWith(props, ["1", "2"], "replace");
//   });

//   it("Should not allow multiple", () => {
//     props.selection = selection;
//     props.options = options;
//     props.multiple = false;

//     renderHook(() => useUpdateSelection(props, isCheckRadio));

//     expect(callOnChange).toBeCalledWith(props, ["1"], "replace");
//   });
// });

// describe("creatable", () => {
//   let selection = [
//     {
//       value: "1",
//       label: "dup",
//     },
//     {
//       value: "created",
//       label: "created",
//     },
//   ];
//   let options = [
//     {
//       value: "1",
//       label: "dup",
//     },
//     {
//       value: "2",
//       label: "other",
//     },
//   ];

//   it("Should not allow created", () => {
//     props.selection = selection;
//     props.options = options;

//     renderHook(() => useUpdateSelection(props, isCheckRadio));

//     expect(callOnChange).toBeCalledWith(props, ["1"], "replace");
//   });

//   it("Should allow created", () => {
//     props.selection = selection;
//     props.options = options;
//     props.creatable = true;

//     renderHook(() => useUpdateSelection(props, isCheckRadio));

//     expect(callOnChange).toBeCalledWith(props, ["1", "created"], "replace");
//   });
// });

// describe("booleanSwitch", () => {
//   let options = [
//     {
//       value: "true",
//       label: "Yes",
//     },
//     {
//       value: "false",
//       label: "No",
//     },
//   ];

//   it("Should never be empty and default false", () => {
//     isCheckRadio = true;
//     props.options = options;
//     props.multiple = false;

//     renderHook(() => useUpdateSelection(props, isCheckRadio));

//     expect(callOnChange).toBeCalledWith(props, ["false"], "replace");
//   });

//   it("Should never be empty and default true", () => {
//     isCheckRadio = true;
//     props.options = [
//       {
//         value: "false",
//         label: "No",
//       },
//     ];
//     props.multiple = false;

//     renderHook(() => useUpdateSelection(props, isCheckRadio));

//     expect(callOnChange).toBeCalledWith(props, ["true"], "replace");
//   });
// });

// describe("parseTo", () => {
//   it("should be string", () => {
//     renderHook(() => useUpdateSelection(props, isCheckRadio));

//     expect(callOnChange).toBeCalled();
//   });
// });

// describe("allBooleanValues", () => {
//   let options = [
//     {
//       value: "true",
//       label: "Yes",
//     },
//     {
//       value: "false",
//       label: "No",
//     },
//   ];

//   it("should be true", () => {
//     expect(allBooleanValues(options)).toBe(true);
//   });

//   it("should be false", () => {
//     options.push({
//       value: "not bool",
//       label: "not bool",
//     });

//     expect(allBooleanValues(options)).toBe(false);
//   });
// });

// describe("isBooleanSwitch", () => {
//   let options = [
//     {
//       value: "true",
//       label: "Yes",
//     },
//     {
//       value: "false",
//       label: "No",
//     },
//   ];

//   it("should be true, two options", () => {
//     props.options = options;
//     props.multiple = false;

//     expect(isBooleanSwitch(props)).toBe(true);
//   });

//   it("should be true, one option", () => {
//     props.options = [
//       {
//         value: "true",
//         label: "Yes",
//       },
//     ];
//     props.multiple = false;

//     expect(isBooleanSwitch(props)).toBe(true);
//   });

//   it("should be false, multiple", () => {
//     props.options = options;
//     props.multiple = true;

//     expect(isBooleanSwitch(props)).toBe(false);
//   });

//   it("should be false, too many options", () => {
//     props.options = [
//       {
//         value: "true",
//         label: "Yes",
//       },
//       {
//         value: "false",
//         label: "No",
//       },
//       {
//         value: "false",
//         label: "Not",
//       },
//     ];
//     props.multiple = false;

//     expect(isBooleanSwitch(props)).toBe(false);
//   });

//   it("should be false, no options", () => {
//     props.options = [];
//     props.multiple = false;

//     expect(isBooleanSwitch(props)).toBe(false);
//   });

//   it("should be false, not bool", () => {
//     props.options = [
//       {
//         value: "not bool",
//         label: "not bool",
//       },
//     ];
//     props.multiple = false;

//     expect(isBooleanSwitch(props)).toBe(false);
//   });
// });
