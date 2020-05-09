import {
  groupBy,
  inRange,
  without,
  castArray,
  isEmpty,
  last,
  withKeys,
  withoutKeys
} from "./utils";

describe("groupBy", () => {
  let users = [
    { user: "fred", group: 1 },
    { user: "barney", group: 2 },
    { user: "ari", group: 1 },
    { user: "freddie", group: 2 },
    { user: "freds", group: 2 },
    { user: "fred", group: 2 }
  ];

  it("should not changed already sorted", () => {
    let sorted = [{ user: "fred", group: 1 }, { user: "ari", group: 2 }];

    expect(groupBy(sorted, [item => item.group])).toBe(sorted);
    expect(groupBy(sorted, [item => item.group])).toStrictEqual([
      { user: "fred", group: 1 },
      { user: "ari", group: 2 }
    ]);
  });

  it("should group", () => {
    expect(groupBy(users, [item => item.group])).toStrictEqual([
      { user: "fred", group: 1 },
      { user: "ari", group: 1 },
      { user: "barney", group: 2 },
      { user: "freddie", group: 2 },
      { user: "freds", group: 2 },
      { user: "fred", group: 2 }
    ]);
  });

  it("should group multiple", () => {
    expect(
      groupBy(users, [item => item.group, item => item.user])
    ).toStrictEqual([
      { user: "ari", group: 1 },
      { user: "fred", group: 1 },
      { user: "barney", group: 2 },
      { user: "fred", group: 2 },
      { user: "freddie", group: 2 },
      { user: "freds", group: 2 }
    ]);
  });

  it("should group with search", () => {
    expect(
      groupBy(users, [item => item.group, item => item.user === "freds"])
    ).toStrictEqual([
      { user: "fred", group: 1 },
      { user: "ari", group: 1 },
      { user: "freds", group: 2 },
      { user: "barney", group: 2 },
      { user: "freddie", group: 2 },
      { user: "fred", group: 2 }
    ]);
  });

  it("should group with search multiple", () => {
    expect(
      groupBy(users, [
        item => item.group,
        item => item.user === "freds",
        item => item.user.startsWith("fredd"),
        item => item.user.endsWith("fred")
      ])
    ).toStrictEqual([
      { user: "fred", group: 1 },
      { user: "ari", group: 1 },
      { user: "freds", group: 2 },
      { user: "freddie", group: 2 },
      { user: "fred", group: 2 },
      { user: "barney", group: 2 }
    ]);
  });
});

describe("inRange", () => {
  it("should default range at 0 without end, false", () => {
    expect(inRange(-1, 5)).toBe(false);
  });

  it("should default range at 0 without end, true", () => {
    expect(inRange(3, 5)).toBe(true);
  });

  it("should be in range", () => {
    expect(inRange(5, 4, 6)).toBe(true);
  });

  it("should be in range start", () => {
    expect(inRange(4, 4, 6)).toBe(true);
  });

  it("should not be in range end", () => {
    expect(inRange(6, 4, 6)).toBe(false);
  });
});

describe("without", () => {
  it("should do nothing, if empty", () => {
    expect(without([], 0)).toStrictEqual([]);
  });

  it("should do nothing", () => {
    expect(without([1, 2, 3], 0)).toStrictEqual([1, 2, 3]);
  });

  it("should remove", () => {
    expect(without([1, 2], 1)).toStrictEqual([2]);
  });

  it("should remove many", () => {
    expect(without(["1", "2", "4"], ["2", "4"])).toStrictEqual(["1"]);
  });
});

describe("castArray", () => {
  it("should be array", () => {
    expect(castArray(1)).toStrictEqual([1]);
  });

  it("should not change", () => {
    let array = [1];

    expect(castArray(array)).toBe(array);
    expect(castArray(array)).toStrictEqual([1]);
  });
});

describe("isEmpty", () => {
  it("should be empty, string", () => {
    expect(isEmpty("")).toBe(true);
  });

  it("should not be empty, string", () => {
    expect(isEmpty("1")).toBe(false);
  });

  it("should be empty, array", () => {
    expect(isEmpty([])).toBe(true);
  });

  it("should not be empty, array", () => {
    expect(isEmpty([1])).toBe(false);
  });

  it("should be empty, object", () => {
    expect(isEmpty({})).toBe(true);
  });
  it("should not be empty, object", () => {
    expect(isEmpty({ key: "value" })).toBe(false);
  });

  it("should be empty, size", () => {
    expect(isEmpty(new Set())).toBe(true);
  });

  it("should not be empty, size", () => {
    let withSize = new Set();

    withSize.add(1);

    expect(isEmpty(withSize)).toBe(false);
  });

  it("should be empty, null", () => {
    expect(isEmpty(null)).toBe(true);
  });

  it("should be empty, undefined", () => {
    expect(isEmpty(undefined)).toBe(true);
  });

  it("should not be empty, number", () => {
    expect(isEmpty(0)).toBe(false);
  });
});

describe("last", () => {
  it("should be last item", () => {
    expect(last(["first", "last"])).toBe("last");
  });

  it("should be only item", () => {
    expect(last(["only"])).toBe("only");
  });

  it("should be nothing", () => {
    expect(last([])).toBeUndefined();
  });
});

describe("withKeys", () => {
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
});

describe("withoutKeys", () => {
  it("should get keys without", () => {
    let testObject = {
      start: "",
      startsWith: "",
      notstarts: "",
      tarts: ""
    };

    expect(withoutKeys(testObject, "start")).toStrictEqual({
      notstarts: "",
      tarts: ""
    });
  });
});
