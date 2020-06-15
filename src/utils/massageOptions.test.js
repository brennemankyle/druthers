import massageOptions, { flattenOptions } from "./massageOptions";

let props;
let expectedProps;
let funcValueKey = obj => obj["value"];
let funcLabelKey = obj => obj["label"];
let funcOptionKey = obj => obj["options"];

beforeEach(() => {
  props = {
    options: [],
    allowDuplicates: true,
    valueKey: funcValueKey,
    labelKey: funcLabelKey,
    optionsKey: funcOptionKey
  };

  expectedProps = {
    hasOptions: false,
    hasOptionGroups: false,
    options: [],
    hierarchicalOptions: []
  };
});

describe("options", () => {
  it("should always be objects of strings", () => {
    props.options = [
      {
        label: 1,
        value: 1
      }
    ];

    expect(massageOptions(props)).toStrictEqual({
      ...expectedProps,
      hasOptions: true,
      options: [
        {
          label: "1",
          value: "1"
        }
      ],
      hierarchicalOptions: [
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

    expect(massageOptions(props)).toStrictEqual({
      ...expectedProps,
      hasOptions: true,
      options: [
        {
          label: "1",
          value: "1"
        }
      ],
      hierarchicalOptions: [
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

    expect(massageOptions(props)).toStrictEqual({
      ...expectedProps,
      hasOptions: true,
      options: [{}],
      hierarchicalOptions: [{}]
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

    expect(massageOptions(props)).toStrictEqual({
      ...expectedProps,
      hasOptions: true,
      options: [
        {
          label: "One",
          value: "1"
        }
      ],
      hierarchicalOptions: [
        {
          label: "One",
          value: "1"
        }
      ]
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

    expect(massageOptions(props)).toStrictEqual({
      ...expectedProps,
      hasOptions: true,
      options: [{}],
      hierarchicalOptions: [{}]
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

    expect(massageOptions(props)).toStrictEqual({
      ...expectedProps,
      hasOptions: true,
      options: [
        {
          label: "One",
          value: "1"
        }
      ],
      hierarchicalOptions: [
        {
          label: "One",
          value: "1"
        }
      ]
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

  it("should flatten option groups", () => {
    props.options = optionGroups;

    expect(massageOptions(props)).toStrictEqual({
      ...expectedProps,
      hasOptions: true,
      hasOptionGroups: true,
      options: [
        {
          childGroup: "0",
          label: "Parent 1",
          value: "1",
          options: expect.anything()
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
          label: "Parent 3 without value",
          options: expect.anything()
        },
        {
          group: "1",
          label: "P3 Child 1",
          value: "p3child1"
        }
      ],
      hierarchicalOptions: [
        {
          childGroup: "0",
          label: "Parent 1",
          value: "1",
          options: [
            {
              group: "0",
              label: "P1 Child 1",
              value: "p1child1"
            }
          ]
        },
        {
          label: "Parent 2 without child options",
          value: "2"
        },
        {
          childGroup: "1",
          label: "Parent 3 without value",
          options: [
            {
              group: "1",
              label: "P3 Child 1",
              value: "p3child1"
            }
          ]
        }
      ]
    });
  });

  it("should keep flattened option groups next to each other", () => {
    props.options = optionGroups;

    let outputProps = massageOptions(props);
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

    expect(massageOptions(props)).toStrictEqual({
      ...expectedProps,
      hasOptionGroups: true,
      hasOptions: true,
      options: [
        {
          label: "Burger",
          childGroup: "0",
          value: "burger",
          options: expect.anything()
        },
        {
          group: "0",
          childGroup: "0.0",
          label: "Patty",
          value: "patty",
          options: expect.anything()
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
          value: "veggie",
          options: expect.anything()
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
          value: "all_condiments",
          options: expect.anything()
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
      ],
      hierarchicalOptions: [
        {
          childGroup: "0",
          value: "burger",
          label: "Burger",
          options: [
            {
              group: "0",
              childGroup: "0.0",
              value: "patty",
              label: "Patty",
              options: [
                { group: "0.0", value: "beef", label: "Beef" },
                {
                  group: "0.0",
                  childGroup: "0.0.0",
                  value: "veggie",
                  label: "Veggie",
                  options: [
                    { group: "0.0.0", value: "blackbean", label: "Black bean" },
                    { group: "0.0.0", value: "grain", label: "Grain" },
                    { group: "0.0.0", value: "mirepoix", label: "Mirepoix" }
                  ]
                },
                { group: "0.0", value: "lamb", label: "Lamb" }
              ]
            },
            { group: "0", value: "cheese", label: "Cheese" },
            { group: "0", value: "pickle", label: "Pickle" },
            { group: "0", value: "lettuce", label: "Lettuce" },
            { group: "0", value: "tomato", label: "Tomato" },
            {
              group: "0",
              childGroup: "0.1",
              value: "all_condiments",
              label: "Condiments",
              options: [
                { group: "0.1", value: "ketchup", label: "Ketchup" },
                { group: "0.1", value: "mustard", label: "Mustard" },
                { group: "0.1", value: "mayo", label: "Mayo" }
              ]
            }
          ]
        },
        { value: "to_go", label: "To Go" }
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

    expect(massageOptions(props)).toStrictEqual({
      ...expectedProps,
      hasOptions: true,
      hasOptionGroups: true,
      options: [
        {
          childGroup: "0",
          label: "Parent 1",
          value: "1",
          options: expect.anything()
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
          label: "Parent 3 without value",
          options: expect.anything()
        },
        {
          group: "1",
          label: "P3 Child 1",
          value: "p3child1"
        }
      ],
      hierarchicalOptions: [
        {
          childGroup: "0",
          label: "Parent 1",
          value: "1",
          options: [
            {
              group: "0",
              label: "P1 Child 1",
              value: "p1child1"
            }
          ]
        },
        {
          label: "Parent 2 without child options",
          value: "2"
        },
        {
          childGroup: "1",
          label: "Parent 3 without value",
          options: [
            {
              group: "1",
              label: "P3 Child 1",
              value: "p3child1"
            }
          ]
        }
      ]
    });
  });

  it("should remove duplicates and cleanup parents", () => {
    props.allowDuplicates = false;
    props.options = [
      {
        label: "Parent 1 CLEAN",
        value: "1",
        options: [
          {
            label: "DUPLICATE of parent",
            value: "1"
          }
        ]
      },
      {
        label: "Parent 2 without child options",
        value: 2
      },
      {
        label: "Parent 3 without value REMOVE",
        options: [
          {
            label: "DUPLICATE",
            value: "2"
          }
        ]
      }
    ];

    expect(massageOptions(props)).toStrictEqual({
      ...expectedProps,
      hasOptions: true,
      hasOptionGroups: false,
      options: [
        {
          label: "Parent 1 CLEAN",
          value: "1"
        },
        {
          label: "Parent 2 without child options",
          value: "2"
        }
      ],
      hierarchicalOptions: [
        {
          label: "Parent 1 CLEAN",
          value: "1"
        },
        {
          label: "Parent 2 without child options",
          value: "2"
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

    expect(massageOptions(props)).toStrictEqual({
      ...expectedProps,
      hasOptions: true,
      options: [{}, {}, {}],
      hierarchicalOptions: [{}, {}, {}]
    });
  });

  it("should not get child options with bad key selector func", () => {
    let funcNothing = object => object["nothing"];
    props.options = optionGroups;
    props.optionsKey = funcNothing;

    expect(massageOptions(props)).toStrictEqual({
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
      hierarchicalOptions: [
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
      ]
    });
  });

  it("should not get options with bad key selector strings", () => {
    props.options = optionGroups;
    props.allowDuplicates = false;
    props.optionsKey = "nothing";
    props.valueKey = "nothing";
    props.labelKey = "nothing";

    expect(massageOptions(props)).toStrictEqual({
      ...expectedProps,
      hasOptions: true,
      options: [{}, {}, {}],
      hierarchicalOptions: [{}, {}, {}]
    });
  });

  it("should not get child options with bad key selector string", () => {
    props.options = optionGroups;
    props.optionsKey = "nothing";

    expect(massageOptions(props)).toStrictEqual({
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
      hierarchicalOptions: [
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
      ]
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

    expect(massageOptions(props)).toStrictEqual({
      ...expectedProps,
      hasOptions: true,
      hasOptionGroups: true,
      options: [
        {
          childGroup: "0",
          label: "Parent 1",
          value: "1",
          options: expect.anything()
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
          label: "Parent 3 without value",
          options: expect.anything()
        },
        {
          group: "1",
          label: "P3 Child 1",
          value: "p3child1"
        }
      ],
      hierarchicalOptions: [
        {
          childGroup: "0",
          label: "Parent 1",
          value: "1",
          options: [
            {
              group: "0",
              label: "P1 Child 1",
              value: "p1child1"
            }
          ]
        },
        {
          label: "Parent 2 without child options",
          value: "2"
        },
        {
          childGroup: "1",
          label: "Parent 3 without value",
          options: [
            {
              group: "1",
              label: "P3 Child 1",
              value: "p3child1"
            }
          ]
        }
      ]
    });
  });

  it("should get child options with key selector strings", () => {
    props.options = otherOptionGroups;
    props.optionsKey = "otherOptions";
    props.valueKey = "otherValue";
    props.labelKey = "otherLabel";

    expect(massageOptions(props)).toStrictEqual({
      ...expectedProps,
      hasOptions: true,
      hasOptionGroups: true,
      options: [
        {
          childGroup: "0",
          label: "Parent 1",
          value: "1",
          options: expect.anything()
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
          label: "Parent 3 without value",
          options: expect.anything()
        },
        {
          group: "1",
          label: "P3 Child 1",
          value: "p3child1"
        }
      ],
      hierarchicalOptions: [
        {
          childGroup: "0",
          label: "Parent 1",
          value: "1",
          options: [
            {
              group: "0",
              label: "P1 Child 1",
              value: "p1child1"
            }
          ]
        },
        {
          label: "Parent 2 without child options",
          value: "2"
        },
        {
          childGroup: "1",
          label: "Parent 3 without value",
          options: [
            {
              group: "1",
              label: "P3 Child 1",
              value: "p3child1"
            }
          ]
        }
      ]
    });
  });
});

describe("flattenOptions", () => {
  it("should flatten", () => {
    let options = [
      {
        label: "something",
        options: [{ label: "other", options: [{ label: "last" }] }]
      }
    ];

    let flattened = flattenOptions(options, true);

    expect(flattenOptions(options, false)).toStrictEqual(options);
    expect(flattened).toStrictEqual([
      { label: "something", options: expect.anything() },
      { label: "other", options: expect.anything() },
      { label: "last" }
    ]);

    // Should have same pointer
    expect(flattened[0]).toBe(options[0]);
    expect(flattened[1]).toBe(options[0].options[0]);
    expect(flattened[2]).toBe(options[0].options[0].options[0]);
  });
});
