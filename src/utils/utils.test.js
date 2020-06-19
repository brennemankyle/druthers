import {
  rankFilterSort,
  inRange,
  without,
  castArray,
  isEmpty,
  last,
  withKeys,
  withoutKeys
} from "./utils";

describe("rankFilterSort", () => {
  let items;
  let searchTerm;
  let sortComparator;
  let calculateRankThunk;

  beforeEach(() => {
    items = [];
    searchTerm = "";

    sortComparator = (a, b) =>
      a.rank - b.rank || a.label.localeCompare(b.label); // sort by rank, then alphabetically

    calculateRankThunk = searchTerm => option => {
      searchTerm = searchTerm.toLowerCase();

      if (option.label.toLowerCase() === searchTerm) return 8;
      else if (option.label.toLowerCase().startsWith(searchTerm)) return 4;
      else if (option.label.toLowerCase().endsWith(searchTerm)) return 2;
      else if (option.label.toLowerCase().includes(searchTerm)) return 1;
      else return 0;
    };
  });

  it("should filter by label equals", () => {
    items = [
      {
        label: "test",
        value: "1"
      },
      {
        label: "not",
        value: "not"
      }
    ];
    searchTerm = "test";

    expect(rankFilterSort(items, calculateRankThunk(searchTerm))).toStrictEqual(
      [
        {
          label: "test",
          value: "1"
        }
      ]
    );
  });

  it("should filter by label includes search term", () => {
    items = [
      {
        label: "testing",
        value: "1"
      },
      {
        label: "not",
        value: "not"
      }
    ];
    searchTerm = "test";

    expect(rankFilterSort(items, calculateRankThunk(searchTerm))).toStrictEqual(
      [
        {
          label: "testing",
          value: "1"
        }
      ]
    );
  });

  it("should not filter by value includes search term", () => {
    items = [
      {
        label: "1",
        value: "testing"
      },
      {
        label: "not",
        value: "not"
      }
    ];
    searchTerm = "test";

    expect(rankFilterSort(items, calculateRankThunk(searchTerm))).toStrictEqual(
      []
    );
  });

  it("should keep parents of child search term", () => {
    items = [
      {
        label: "Parent 1",
        value: "1",
        children: [
          {
            label: "P1 Child 1",
            value: "p1child1",
            children: [{ label: "search", value: "p1c1child1" }]
          }
        ]
      },
      {
        label: "search",
        value: "2",
        children: [{ label: "P2 child 2", value: "p2child1" }]
      }
    ];
    searchTerm = "search";

    expect(rankFilterSort(items, calculateRankThunk(searchTerm))).toStrictEqual(
      [
        {
          label: "Parent 1",
          value: "1",
          children: [
            {
              label: "P1 Child 1",
              value: "p1child1",
              children: [{ label: "search", value: "p1c1child1" }]
            }
          ]
        },
        {
          label: "search",
          value: "2"
        }
      ]
    );
  });

  it("should sort parent with multiple children rank first", () => {
    items = [
      {
        label: "Parent 1",
        value: "1",
        children: [
          {
            label: "search",
            value: "p1child2"
          }
        ]
      },
      {
        label: "search",
        value: "2",
        children: [{ label: "P2 child 2", value: "p2child1" }]
      },
      {
        label: "Parent 3",
        value: "3",
        children: [
          {
            label: "P3 Child 1",
            value: "p3child1",
            children: [{ label: "search", value: "p3c1child1" }]
          },
          {
            label: "search",
            value: "p3child2"
          }
        ]
      }
    ];
    searchTerm = "search";

    expect(rankFilterSort(items, calculateRankThunk(searchTerm))).toStrictEqual(
      [
        {
          label: "Parent 3",
          value: "3",
          children: [
            {
              label: "P3 Child 1",
              value: "p3child1",
              children: [{ label: "search", value: "p3c1child1" }]
            },
            {
              label: "search",
              value: "p3child2"
            }
          ]
        },
        {
          label: "Parent 1",
          value: "1",
          children: [
            {
              label: "search",
              value: "p1child2"
            }
          ]
        },
        {
          label: "search",
          value: "2"
        }
      ]
    );
  });

  it("should remove empty parents", () => {
    items = [
      {
        label: "Parent 1",
        value: "1",
        children: [
          {
            label: "P1 Child 1",
            value: "p1child1",
            children: [{ label: "search", value: "p1c1child1" }]
          }
        ]
      },
      {
        label: "search",
        value: "2",
        children: [{ label: "P2 child 2", value: "p2child1" }]
      }
    ];
    searchTerm = "P2 child 2";

    expect(rankFilterSort(items, calculateRankThunk(searchTerm))).toStrictEqual(
      [
        {
          label: "search",
          value: "2",
          children: [{ label: "P2 child 2", value: "p2child1" }]
        }
      ]
    );
  });

  it("should sort options in order", () => {
    items = [
      {
        label: "nothing",
        value: "0"
      },
      {
        label: "_search_",
        value: "1"
      },
      {
        label: "_search",
        value: "2"
      },
      {
        label: "search_",
        value: "3"
      },
      {
        label: "search",
        value: "4"
      }
    ];
    searchTerm = "search";

    expect(rankFilterSort(items, calculateRankThunk(searchTerm))).toStrictEqual(
      [
        {
          label: "search",
          value: "4"
        },
        {
          label: "search_",
          value: "3"
        },
        {
          label: "_search",
          value: "2"
        },
        {
          label: "_search_",
          value: "1"
        }
      ]
    );
  });

  it("should custom sort options in order", () => {
    items = [
      {
        label: "nothing",
        value: "0"
      },
      {
        label: "nothing",
        value: "p",
        options: [
          {
            label: "_search_",
            value: "p1"
          },
          {
            label: "_search",
            value: "p2"
          },
          {
            label: "search_",
            value: "p3"
          },
          {
            label: "search",
            value: "p4"
          },
          {
            label: "Zsort_search_",
            value: "p5"
          },
          {
            label: "Asort_search_",
            value: "p6"
          }
        ]
      },
      {
        label: "_search_",
        value: "1"
      },
      {
        label: "_search",
        value: "2"
      },
      {
        label: "search_",
        value: "3"
      },
      {
        label: "search",
        value: "4"
      },
      {
        label: "Zsort_search_",
        value: "6"
      },
      {
        label: "Asort_search_",
        value: "5"
      }
    ];
    searchTerm = "search";
    sortComparator = (a, b) =>
      b.rank - a.rank || a.item.label.localeCompare(b.item.label);
    let childrenKey = "options";

    expect(
      rankFilterSort(
        items,
        calculateRankThunk(searchTerm),
        sortComparator,
        childrenKey
      )
    ).toStrictEqual([
      {
        label: "nothing",
        value: "p",
        options: [
          {
            label: "search",
            value: "p4"
          },
          {
            label: "search_",
            value: "p3"
          },
          {
            label: "_search",
            value: "p2"
          },
          {
            label: "_search_",
            value: "p1"
          },
          {
            label: "Asort_search_",
            value: "p6"
          },
          {
            label: "Zsort_search_",
            value: "p5"
          }
        ]
      },
      {
        label: "search",
        value: "4"
      },
      {
        label: "search_",
        value: "3"
      },
      {
        label: "_search",
        value: "2"
      },
      {
        label: "_search_",
        value: "1"
      },
      {
        label: "Asort_search_",
        value: "5"
      },
      {
        label: "Zsort_search_",
        value: "6"
      }
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
    let testArray = [];

    expect(without(testArray, 0)).toBe(testArray);
    expect(without(testArray, 0)).toStrictEqual([]);
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
