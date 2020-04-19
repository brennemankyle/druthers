import withKeys from "./withKeys";

let testObject = {
  start: "",
  startsWith: "",
  notstarts: "",
  tarts: ""
};

it("should get keys starting with", () => {
  expect(withKeys(testObject, "start")).toStrictEqual({
    start: "",
    startsWith: ""
  });
});

it("should get keys without starting with", () => {
  expect(withKeys(testObject, "start", true)).toStrictEqual({
    notstarts: "",
    tarts: ""
  });
});
