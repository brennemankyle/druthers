// import massageDataOut from "./massageDataOut";

// let props;

// beforeEach(() => {
//   props = {
//     alwaysReturnArray: false,
//     multiple: false,
//     parseTo: "string"
//   };
// });

// it("should return empty array if alwaysReturnArray", () => {
//   props.alwaysReturnArray = true;

//   expect(massageDataOut(props, [])).toStrictEqual([]);
// });

// it("should return empty array if multiple", () => {
//   props.multiple = true;

//   expect(massageDataOut(props, [])).toStrictEqual([]);
// });

// describe("string", () => {
//   it("should return empty", () => {
//     expect(massageDataOut(props, [])).toStrictEqual("");
//   });

//   it("single", () => {
//     expect(massageDataOut(props, ["value"])).toStrictEqual("value");
//   });

//   it("alwaysReturnArray", () => {
//     props.alwaysReturnArray = true;

//     expect(massageDataOut(props, ["value"])).toStrictEqual(["value"]);
//   });

//   it("single and multiple = true", () => {
//     props.multiple = true;

//     expect(massageDataOut(props, ["value"])).toStrictEqual(["value"]);
//   });

//   it("multiple", () => {
//     props.multiple = true;

//     expect(massageDataOut(props, ["value", "other"])).toStrictEqual([
//       "value",
//       "other"
//     ]);
//   });
// });

// describe("number", () => {
//   beforeEach(() => {
//     props.parseTo = "number";
//   });

//   it("should return empty", () => {
//     expect(massageDataOut(props, [])).toStrictEqual(undefined);
//   });

//   it("single", () => {
//     expect(massageDataOut(props, [1])).toStrictEqual(1);
//   });

//   it("multiple", () => {
//     props.multiple = true;

//     expect(massageDataOut(props, [1, 2])).toStrictEqual([1, 2]);
//   });
// });

// describe("int", () => {
//   beforeEach(() => {
//     props.parseTo = "int";
//   });

//   it("should return empty", () => {
//     expect(massageDataOut(props, [])).toStrictEqual(undefined);
//   });

//   it("single", () => {
//     expect(massageDataOut(props, [1])).toStrictEqual(1);
//   });

//   it("multiple", () => {
//     props.multiple = true;

//     expect(massageDataOut(props, [1, 2])).toStrictEqual([1, 2]);
//   });
// });

// describe("float", () => {
//   beforeEach(() => {
//     props.parseTo = "float";
//   });

//   it("should return empty", () => {
//     expect(massageDataOut(props, [])).toStrictEqual(undefined);
//   });

//   it("single", () => {
//     expect(massageDataOut(props, [0.1])).toStrictEqual(0.1);
//   });

//   it("multiple", () => {
//     props.multiple = true;

//     expect(massageDataOut(props, [0.1, 0.2])).toStrictEqual([0.1, 0.2]);
//   });
// });

// describe("boolean", () => {
//   beforeEach(() => {
//     props.parseTo = "boolean";
//   });

//   it("should return empty", () => {
//     expect(massageDataOut(props, [])).toStrictEqual(undefined);
//   });

//   it("single", () => {
//     expect(massageDataOut(props, ["true"])).toStrictEqual(true);
//   });

//   it("multiple", () => {
//     props.multiple = true;

//     expect(
//       massageDataOut(props, ["true", "false", "not", "any", "thing", "TRuE"])
//     ).toStrictEqual([true, false, true]);
//   });
// });
