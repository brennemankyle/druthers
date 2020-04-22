import massageDataIn from "./massageDataIn";

let props;
let expectedProps;
let funcValueKey = obj => obj["value"];
let funcLabelKey = obj => obj["label"];
let funcOptionKey = obj => obj["options"];

beforeEach(() => {
  props = {
    selection: "",
    options: [],
    placeholder: "placeholder",
    allowDuplicates: true,
    valueKey: funcValueKey,
    labelKey: funcLabelKey,
    optionsKey: funcOptionKey
  };

  expectedProps = {
    hasOptionGroups: false,
    hasOptions: false,
    hasSelection: false,
    allowDuplicates: true,
    selection: [],
    options: [],
    singleNoOptions: false,
    text_placeholder: "placeholder",
    valueKey: funcValueKey,
    labelKey: funcLabelKey,
    optionsKey: funcOptionKey
  };
});

it("should set text_placeholder from text_placeholder", () => {
  props.text_placeholder = "text_placeholder";

  expect(massageDataIn(props)).toStrictEqual({
    ...expectedProps,
    text_placeholder: "text_placeholder"
  });
});

it("should set singleNoOptions", () => {
  props.creatable = true;
  props.multiple = false;

  expect(massageDataIn(props)).toStrictEqual({
    ...expectedProps,
    creatable: true,
    multiple: false,
    singleNoOptions: true
  });
});

describe("selection", () => {
  it("empty values should always be an array", () => {
    expect(massageDataIn(props)).toStrictEqual(expectedProps);
  });

  it("single value should always be an array of objects", () => {
    props.selection = "1";

    expect(massageDataIn(props)).toStrictEqual({
      ...expectedProps,
      hasSelection: true,
      selection: [
        {
          label: "1",
          value: "1"
        }
      ]
    });
  });

  it("should always convert to strings", () => {
    props.selection = [1, 2];

    expect(massageDataIn(props)).toStrictEqual({
      ...expectedProps,
      hasSelection: true,
      selection: [
        {
          label: "1",
          value: "1"
        },
        {
          label: "2",
          value: "2"
        }
      ]
    });
  });

  it("should hydrate selection from options", () => {
    props.selection = [1, 2];
    props.options = [
      {
        label: "One",
        value: "1"
      },
      {
        label: "Two",
        value: "2"
      }
    ];

    expect(massageDataIn(props)).toStrictEqual({
      ...expectedProps,
      options: props.options,
      hasSelection: true,
      hasOptions: true,
      selection: [
        {
          label: "One",
          value: "1"
        },
        {
          label: "Two",
          value: "2"
        }
      ]
    });
  });
});

describe("options", () => {
  it("should always be objects of strings", () => {
    props.options = [
      {
        label: 1,
        value: 1
      }
    ];

    expect(massageDataIn(props)).toStrictEqual({
      ...expectedProps,
      hasOptions: true,
      options: [
        {
          label: "1",
          value: "1"
        }
      ]
    });
  });

  it("should not allow duplicates", () => {
    props.allowDuplicates = false;
    props.options = [
      {
        label: 1,
        value: 1
      },
      {
        label: 1,
        value: "1"
      },
      {
        label: "One",
        value: 1
      }
    ];

    expect(massageDataIn(props)).toStrictEqual({
      ...expectedProps,
      hasOptions: true,
      allowDuplicates: false,
      options: [
        {
          label: "1",
          value: "1"
        }
      ]
    });
  });

  it("should not get option label/value with bad key selector func", () => {
    let funcNothing = object => object["nothing"];
    props.options = [
      {
        label: "One",
        value: "1"
      }
    ];
    props.valueKey = funcNothing;
    props.labelKey = funcNothing;

    expect(massageDataIn(props)).toStrictEqual({
      ...expectedProps,
      hasOptions: true,
      options: [{}],
      valueKey: funcNothing,
      labelKey: funcNothing
    });
  });

  it("should get option label/value with key selector func", () => {
    let funcValueKey = object => object["otherValue"];
    let funcLabelKey = object => object["otherLabel"];
    props.options = [
      {
        otherLabel: "One",
        otherValue: "1",
        label: "nothing",
        value: "nothing"
      }
    ];
    props.valueKey = funcValueKey;
    props.labelKey = funcLabelKey;

    expect(massageDataIn(props)).toStrictEqual({
      ...expectedProps,
      hasOptions: true,
      options: [
        {
          label: "One",
          value: "1"
        }
      ],
      valueKey: funcValueKey,
      labelKey: funcLabelKey
    });
  });

  it("should not get option label/value with bad key selector string", () => {
    props.options = [
      {
        label: "One",
        value: "1"
      }
    ];
    props.valueKey = "nothing";
    props.labelKey = "nothing";

    expect(massageDataIn(props)).toStrictEqual({
      ...expectedProps,
      hasOptions: true,
      options: [{}],
      selection: [],
      valueKey: "nothing",
      labelKey: "nothing"
    });
  });

  it("should get option label/value with key selector string", () => {
    props.options = [
      {
        otherLabel: "One",
        otherValue: "1",
        label: "nothing",
        value: "nothing"
      }
    ];
    props.valueKey = "otherValue";
    props.labelKey = "otherLabel";

    expect(massageDataIn(props)).toStrictEqual({
      ...expectedProps,
      hasOptions: true,
      options: [
        {
          label: "One",
          value: "1"
        }
      ],
      valueKey: "otherValue",
      labelKey: "otherLabel"
    });
  });
});

describe("option groups", () => {
  let optionGroups = [
    {
      label: "Parent 1",
      value: "1",
      options: [
        {
          label: "P1 Child 1",
          value: "p1child1"
        }
      ]
    },
    {
      label: "Parent 2 without child options",
      value: 2
    },
    {
      label: "Parent 3 without value",
      options: [
        {
          label: "P3 Child 1",
          value: "p3child1"
        }
      ]
    }
  ];

  let otherOptionGroups = [
    {
      otherLabel: "Parent 1",
      otherValue: "1",
      otherOptions: [
        {
          otherLabel: "P1 Child 1",
          otherValue: "p1child1"
        }
      ]
    },
    {
      otherLabel: "Parent 2 without child options",
      otherValue: 2
    },
    {
      otherLabel: "Parent 3 without value",
      otherOptions: [
        {
          otherLabel: "P3 Child 1",
          otherValue: "p3child1"
        }
      ]
    }
  ];

  it("should flatten option groups and hydrate selection", () => {
    props.options = optionGroups;
    props.selection = [1, "p1child1", "2", "created"];

    expect(massageDataIn(props)).toStrictEqual({
      ...expectedProps,
      hasOptionGroups: true,
      hasOptions: true,
      hasSelection: true,
      selection: [
        {
          label: "Parent 1",
          childGroup: "0",
          value: "1"
        },
        {
          group: "0",
          label: "P1 Child 1",
          value: "p1child1"
        },
        {
          label: "Parent 2 without child options",
          value: "2"
        },
        {
          label: "created",
          value: "created"
        }
      ],
      options: [
        {
          childGroup: "0",
          label: "Parent 1",
          value: "1"
        },
        {
          group: "0",
          label: "P1 Child 1",
          value: "p1child1"
        },
        {
          label: "Parent 2 without child options",
          value: "2"
        },
        {
          childGroup: "1",
          label: "Parent 3 without value"
        },
        {
          group: "1",
          label: "P3 Child 1",
          value: "p3child1"
        }
      ]
    });
  });

  it("should keep flattened option groups next to each other", () => {
    props.options = optionGroups;

    let outputProps = massageDataIn(props);
    expect(outputProps.options[0].group).toBeUndefined();
    expect(outputProps.options[0].childGroup).toBe("0");

    expect(outputProps.options[1].group).toBe("0");
    expect(outputProps.options[1].childGroup).toBeUndefined();

    expect(outputProps.options[2].group).toBeUndefined();
    expect(outputProps.options[2].childGroup).toBeUndefined();

    expect(outputProps.options[3].group).toBeUndefined();
    expect(outputProps.options[3].childGroup).toBe("1");

    expect(outputProps.options[4].group).toBe("1");
    expect(outputProps.options[4].childGroup).toBeUndefined();
  });

  it("should allow infinite option nesting", () => {
    let infiniteOptionGroupOptions = [
      {
        value: "burger",
        label: "Burger",
        options: [
          {
            value: "patty",
            label: "Patty",
            options: [
              { value: "beef", label: "Beef" },
              {
                value: "veggie",
                label: "Veggie",
                options: [
                  { value: "blackbean", label: "Black bean" },
                  { value: "grain", label: "Grain" },
                  { value: "mirepoix", label: "Mirepoix" }
                ]
              },
              { value: "lamb", label: "Lamb" }
            ]
          },
          { value: "cheese", label: "Cheese" },
          { value: "pickle", label: "Pickle" },
          { value: "lettuce", label: "Lettuce" },
          { value: "tomato", label: "Tomato" },
          {
            value: "all_condiments",
            label: "Condiments",
            options: [
              { value: "ketchup", label: "Ketchup" },
              { value: "mustard", label: "Mustard" },
              { value: "mayo", label: "Mayo" }
            ]
          }
        ]
      },
      { value: "to_go", label: "To Go" }
    ];

    props.options = infiniteOptionGroupOptions;

    expect(massageDataIn(props)).toStrictEqual({
      ...expectedProps,
      hasOptionGroups: true,
      hasOptions: true,
      options: [
        {
          label: "Burger",
          childGroup: "0",
          value: "burger"
        },
        {
          group: "0",
          childGroup: "0.0",
          label: "Patty",
          value: "patty"
        },
        {
          group: "0.0",
          label: "Beef",
          value: "beef"
        },
        {
          group: "0.0",
          childGroup: "0.0.0",
          label: "Veggie",
          value: "veggie"
        },
        {
          group: "0.0.0",
          label: "Black bean",
          value: "blackbean"
        },
        {
          group: "0.0.0",
          label: "Grain",
          value: "grain"
        },
        {
          group: "0.0.0",
          label: "Mirepoix",
          value: "mirepoix"
        },
        {
          group: "0.0",
          label: "Lamb",
          value: "lamb"
        },
        {
          group: "0",
          label: "Cheese",
          value: "cheese"
        },
        {
          group: "0",
          label: "Pickle",
          value: "pickle"
        },
        {
          group: "0",
          label: "Lettuce",
          value: "lettuce"
        },
        {
          group: "0",
          label: "Tomato",
          value: "tomato"
        },
        {
          group: "0",
          childGroup: "0.1",
          label: "Condiments",
          value: "all_condiments"
        },
        {
          group: "0.1",
          label: "Ketchup",
          value: "ketchup"
        },
        {
          group: "0.1",
          label: "Mustard",
          value: "mustard"
        },
        {
          group: "0.1",
          label: "Mayo",
          value: "mayo"
        },
        {
          label: "To Go",
          value: "to_go"
        }
      ]
    });
  });

  it("should not allow duplicates", () => {
    props.allowDuplicates = false;
    props.options = [
      {
        label: "Parent 1",
        value: "1",
        options: [
          {
            label: "P1 Child 1",
            value: "p1child1"
          },
          {
            label: "DUPLICATE P1 Child 1",
            value: "p1child1"
          }
        ]
      },
      {
        label: "Parent 2 without child options",
        value: 2
      },
      {
        label: "Parent 3 without value",
        options: [
          {
            label: "P3 Child 1",
            value: "p3child1"
          },
          {
            label: "DUPLICATE P1 Child 1",
            value: "p1child1"
          }
        ]
      },
      {
        label: "DUPLICATE Parent 1",
        value: 1
      },
      {
        label: "DUPLICATE Parent 2",
        value: 2
      }
    ];

    expect(massageDataIn(props)).toStrictEqual({
      ...expectedProps,
      hasOptionGroups: true,
      hasOptions: true,
      allowDuplicates: false,
      options: [
        {
          childGroup: "0",
          label: "Parent 1",
          value: "1"
        },
        {
          group: "0",
          label: "P1 Child 1",
          value: "p1child1"
        },
        {
          label: "Parent 2 without child options",
          value: "2"
        },
        {
          childGroup: "1",
          label: "Parent 3 without value"
        },
        {
          group: "1",
          label: "P3 Child 1",
          value: "p3child1"
        }
      ]
    });
  });

  it("should not get options with bad key selector functions", () => {
    let funcNothing = object => object["nothing"];
    props.allowDuplicates = false;
    props.options = optionGroups;
    props.optionsKey = funcNothing;
    props.valueKey = funcNothing;
    props.labelKey = funcNothing;

    expect(massageDataIn(props)).toStrictEqual({
      ...expectedProps,
      hasOptions: true,
      allowDuplicates: false,
      options: [{}],
      optionsKey: funcNothing,
      valueKey: funcNothing,
      labelKey: funcNothing
    });
  });

  it("should not get child options with bad key selector func", () => {
    let funcNothing = object => object["nothing"];
    props.options = optionGroups;
    props.optionsKey = funcNothing;

    expect(massageDataIn(props)).toStrictEqual({
      ...expectedProps,
      hasOptions: true,
      options: [
        {
          label: "Parent 1",
          value: "1"
        },
        {
          label: "Parent 2 without child options",
          value: "2"
        },
        {
          label: "Parent 3 without value"
        }
      ],
      optionsKey: funcNothing
    });
  });

  it("should not get options with bad key selector strings", () => {
    props.options = optionGroups;
    props.allowDuplicates = false;
    props.optionsKey = "nothing";
    props.valueKey = "nothing";
    props.labelKey = "nothing";

    expect(massageDataIn(props)).toStrictEqual({
      ...expectedProps,
      hasOptions: true,
      allowDuplicates: false,
      options: [{}],
      optionsKey: "nothing",
      valueKey: "nothing",
      labelKey: "nothing"
    });
  });

  it("should not get child options with bad key selector string", () => {
    props.options = optionGroups;
    props.optionsKey = "nothing";

    expect(massageDataIn(props)).toStrictEqual({
      ...expectedProps,
      hasOptions: true,
      options: [
        {
          label: "Parent 1",
          value: "1"
        },
        {
          label: "Parent 2 without child options",
          value: "2"
        },
        {
          label: "Parent 3 without value"
        }
      ],
      optionsKey: "nothing"
    });
  });

  it("should get options with key selector functions", () => {
    let funcOptionsKey = object => object["otherOptions"];
    let funcValueKey = object => object["otherValue"];
    let funcLabelKey = object => object["otherLabel"];
    props.options = otherOptionGroups;
    props.optionsKey = funcOptionsKey;
    props.valueKey = funcValueKey;
    props.labelKey = funcLabelKey;

    expect(massageDataIn(props)).toStrictEqual({
      ...expectedProps,
      hasOptionGroups: true,
      hasOptions: true,
      options: [
        {
          childGroup: "0",
          label: "Parent 1",
          value: "1"
        },
        {
          group: "0",
          label: "P1 Child 1",
          value: "p1child1"
        },
        {
          label: "Parent 2 without child options",
          value: "2"
        },
        {
          childGroup: "1",
          label: "Parent 3 without value"
        },
        {
          group: "1",
          label: "P3 Child 1",
          value: "p3child1"
        }
      ],
      optionsKey: funcOptionsKey,
      valueKey: funcValueKey,
      labelKey: funcLabelKey
    });
  });

  it("should get child options with key selector strings", () => {
    props.options = otherOptionGroups;
    props.optionsKey = "otherOptions";
    props.valueKey = "otherValue";
    props.labelKey = "otherLabel";

    expect(massageDataIn(props)).toStrictEqual({
      ...expectedProps,
      hasOptionGroups: true,
      hasOptions: true,
      options: [
        {
          childGroup: "0",
          label: "Parent 1",
          value: "1"
        },
        {
          group: "0",
          label: "P1 Child 1",
          value: "p1child1"
        },
        {
          label: "Parent 2 without child options",
          value: "2"
        },
        {
          childGroup: "1",
          label: "Parent 3 without value"
        },
        {
          group: "1",
          label: "P3 Child 1",
          value: "p3child1"
        }
      ],
      optionsKey: "otherOptions",
      valueKey: "otherValue",
      labelKey: "otherLabel"
    });
  });
});
