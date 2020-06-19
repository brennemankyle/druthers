import filterOptions from "./filterOptions";

let props;
let searchTerm;

beforeEach(() => {
  props = {
    hasOptionGroups: false,
    selection: [],
    options: [],
    hierarchicalOptions: []
  };

  searchTerm = "";
});

it("should do nothing", () => {
  props.options = [
    {
      label: "test",
      value: "test"
    }
  ];
  props.hierarchicalOptions = props.options;

  let expectedOptions = filterOptions(props, searchTerm);

  expect(expectedOptions).toBe(props.options);
  expect(expectedOptions).toStrictEqual([
    {
      label: "test",
      value: "test"
    }
  ]);
});

it("should filter out selection", () => {
  let selectedOption = {
    label: "selected",
    value: "selected"
  };

  props.selection = [selectedOption];
  props.options = [
    selectedOption,
    {
      label: "test",
      value: "test"
    }
  ];
  props.hierarchicalOptions = props.options;

  expect(filterOptions(props, searchTerm)).toStrictEqual([
    {
      label: "test",
      value: "test"
    }
  ]);
});

it("Remove children of selected", () => {
  let parentOption = {
    childGroup: "0",
    label: "Parent 1",
    value: "1",
    options: [
      {
        group: "0",
        label: "P1 Child 1",
        value: "p1child1",
        childGroup: "0.0",
        options: [
          {
            group: "0.0",
            label: "P1 C1 child 1",
            value: "p1c1child1"
          }
        ]
      }
    ]
  };
  let childOption = {
    group: "1",
    label: "P3 Child 1",
    value: "p3child1"
  };

  props.hasOptionGroups = true;
  props.options = [
    parentOption,
    {
      group: "0",
      label: "P1 Child 1",
      value: "p1child1",
      childGroup: "0.0",
      options: [
        {
          group: "0.0",
          label: "P1 C1 child 1",
          value: "p1c1child1"
        }
      ]
    },
    {
      group: "0.0",
      label: "P1 C1 child 1",
      value: "p1c1child1"
    },
    {
      label: "Parent 2 without child options",
      value: "2"
    },
    {
      childGroup: "1",
      label: "Parent 3 without value",
      options: [childOption]
    },
    childOption
  ];
  props.hierarchicalOptions = [
    parentOption,
    {
      group: "0",
      label: "P1 Child 1",
      value: "p1child1",
      childGroup: "0.0",
      options: [
        {
          group: "0.0",
          label: "P1 C1 child 1",
          value: "p1c1child1"
        }
      ]
    },
    {
      childGroup: "1",
      label: "Parent 3 without value",
      options: [childOption]
    }
  ];
  props.selection = [parentOption, childOption];

  expect(filterOptions(props, searchTerm)).toStrictEqual([
    {
      label: "Parent 2 without child options",
      value: "2"
    },
    {
      childGroup: "1",
      label: "Parent 3 without value",
      options: expect.anything()
    }
  ]);
});

it("should filter by label fuzzy match search term", () => {
  props.options = [
    {
      label: "druthers",
      value: "1"
    },
    {
      label: "not",
      valeu: "not"
    }
  ];
  props.hierarchicalOptions = props.options;
  searchTerm = "druthurs";

  expect(filterOptions(props, searchTerm)).toStrictEqual([
    {
      label: "druthers",
      value: "1"
    }
  ]);
});

it("should sort options in order", () => {
  props.options = [
    {
      label: "nothing",
      value: "0"
    },
    {
      label: "nothing",
      value: "p",
      childGroup: "0",
      options: [
        {
          label: "seerch",
          value: "pFuzzy",
          group: "0"
        },
        {
          label: "_search_",
          value: "p1",
          group: "0"
        },
        {
          label: "_search",
          value: "p2",
          group: "0"
        },
        {
          label: "search_",
          value: "p3",
          group: "0"
        },
        {
          label: "search",
          value: "p4",
          group: "0"
        },
        {
          label: "Zsort_search_",
          value: "p5",
          group: "0"
        },
        {
          label: "Asort_search_",
          value: "p6",
          group: "0"
        },
        {
          label: "value",
          value: "search",
          group: "0"
        }
      ]
    },
    {
      label: "seerch",
      value: "pFuzzy",
      group: "0"
    },
    {
      label: "_search_",
      value: "p1",
      group: "0"
    },
    {
      label: "_search",
      value: "p2",
      group: "0"
    },
    {
      label: "search_",
      value: "p3",
      group: "0"
    },
    {
      label: "search",
      value: "p4",
      group: "0"
    },
    {
      label: "Zsort_search_",
      value: "p5",
      group: "0"
    },
    {
      label: "Asort_search_",
      value: "p6",
      group: "0"
    },
    {
      label: "value",
      value: "search",
      group: "0"
    },
    {
      label: "seerch",
      value: "fuzzy"
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
    },
    {
      label: "value",
      value: "search"
    }
  ];
  props.hierarchicalOptions = [
    {
      label: "nothing",
      value: "0"
    },
    {
      label: "nothing",
      value: "p",
      childGroup: "0",
      options: [
        {
          label: "seerch",
          value: "pFuzzy",
          group: "0"
        },
        {
          label: "_search_",
          value: "p1",
          group: "0"
        },
        {
          label: "_search",
          value: "p2",
          group: "0"
        },
        {
          label: "search_",
          value: "p3",
          group: "0"
        },
        {
          label: "search",
          value: "p4",
          group: "0"
        },
        {
          label: "Zsort_search_",
          value: "p5",
          group: "0"
        },
        {
          label: "Asort_search_",
          value: "p6",
          group: "0"
        },
        {
          label: "value",
          value: "search",
          group: "0"
        }
      ]
    },
    {
      label: "seerch",
      value: "fuzzy"
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
    },
    {
      label: "value",
      value: "search"
    }
  ];
  props.hasOptionGroups = true;
  searchTerm = "search";

  expect(filterOptions(props, searchTerm)).toStrictEqual([
    {
      label: "nothing",
      childGroup: "0",
      options: expect.anything()
    },
    {
      label: "search",
      value: "p4",
      group: "0"
    },
    {
      label: "value",
      value: "search",
      group: "0"
    },
    {
      label: "search_",
      value: "p3",
      group: "0"
    },
    {
      label: "_search",
      value: "p2",
      group: "0"
    },
    {
      label: "_search_",
      value: "p1",
      group: "0"
    },
    {
      label: "Asort_search_",
      value: "p6",
      group: "0"
    },
    {
      label: "Zsort_search_",
      value: "p5",
      group: "0"
    },
    {
      label: "seerch",
      value: "pFuzzy",
      group: "0"
    },
    {
      label: "search",
      value: "4"
    },
    {
      label: "value",
      value: "search"
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
    },
    {
      label: "seerch",
      value: "fuzzy"
    }
  ]);
});
