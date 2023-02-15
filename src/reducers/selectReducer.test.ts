// import selectReducer, { mergeState } from "./selectReducer";
// import defaultProps from "../utils/defaultProps";
// import moveHighlighted from "../utils/moveHighlighted";

// jest.mock("../utils/moveHighlighted");
// moveHighlighted.mockImplementation(() => "test");

// jest.mock("./selectReducer", () => ({
//   __esModule: true,
//   ...jest.requireActual("./selectReducer"),
//   default: jest.fn(jest.requireActual("./selectReducer").default)
// }));

// beforeEach(() => {
//   jest.clearAllMocks();
// });

// describe("selectReducer", () => {
//   let action;
//   let state;

//   beforeEach(() => {
//     action = {
//       type: "",
//       props: defaultProps
//     };

//     state = {
//       areOptionsOpen: false,
//       searchText: "",
//       optionHighlighted: null,
//       selectionHighlighted: null,
//       filteredOptions: []
//     };
//   });

//   it("should error without action props", () => {
//     action.props = null;

//     expect(() => selectReducer(state, action)).toThrow();
//   });

//   it("should error wrong type", () => {
//     expect(() => selectReducer(state, action)).toThrow();
//   });

//   describe("openOptions", () => {
//     beforeEach(() => (action.type = "openOptions"));

//     it("should do nothing if options already open", () => {
//       state.areOptionsOpen = true;

//       expect(selectReducer(state, action)).toBe(state);
//       expect(selectReducer(state, action)).toStrictEqual(state);
//     });

//     it("should open options", () => {
//       state.areOptionsOpen = false;

//       expect(selectReducer(state, action, selectReducer).areOptionsOpen).toBe(
//         true
//       );

//       expect(selectReducer).toBeCalledWith(expect.anything(), {
//         props: expect.anything(),
//         type: "setValidOptionHighlighted"
//       });

//       expect(selectReducer).toBeCalledWith(expect.anything(), {
//         props: expect.anything(),
//         type: "updatePlaceholder"
//       });
//     });

//     it("should set searchText", () => {
//       state.areOptionsOpen = false;
//       state.searchText = "";
//       action.props.selection = [
//         {
//           value: "stuff",
//           label: "stuff"
//         }
//       ];
//       action.props.singleNoOptions = true;
//       action.props.hasSelection = true;

//       expect(selectReducer(state, action, selectReducer).areOptionsOpen).toBe(
//         true
//       );

//       expect(selectReducer).toBeCalledWith(expect.anything(), {
//         props: expect.anything(),
//         type: "setValidOptionHighlighted"
//       });

//       expect(selectReducer).toBeCalledWith(expect.anything(), {
//         props: expect.anything(),
//         type: "updatePlaceholder"
//       });

//       expect(selectReducer).toBeCalledWith(expect.anything(), {
//         props: expect.anything(),
//         type: "setSearchText",
//         payload: "stuff"
//       });
//     });
//   });

//   describe("closeOptions", () => {
//     beforeEach(() => (action.type = "closeOptions"));

//     it("should do nothing if options already closed", () => {
//       state.areOptionsOpen = false;

//       expect(selectReducer(state, action)).toBe(state);
//       expect(selectReducer(state, action)).toStrictEqual(state);
//     });

//     it("should do nothing if options already closed", () => {
//       state.areOptionsOpen = true;

//       expect(selectReducer(state, action, selectReducer).areOptionsOpen).toBe(
//         false
//       );

//       expect(selectReducer).toBeCalledWith(expect.anything(), {
//         props: expect.anything(),
//         type: "clearOptionHighlighted"
//       });

//       expect(selectReducer).toBeCalledWith(expect.anything(), {
//         props: expect.anything(),
//         type: "clearSearchText"
//       });
//     });
//   });

//   describe("setSearchText", () => {
//     beforeEach(() => {
//       action.type = "setSearchText";
//       action.payload = "I'm searchin' here";
//     });

//     it("should do nothing if search text is the same", () => {
//       state.searchText = "I'm searchin' here";

//       expect(selectReducer(state, action)).toBe(state);
//       expect(selectReducer(state, action)).toStrictEqual(state);
//     });

//     it("should set search text", async () => {
//       state.searchText = "nothing";

//       expect(selectReducer(state, action, selectReducer).searchText).toBe(
//         "I'm searchin' here"
//       );

//       expect(selectReducer).toBeCalledWith(expect.anything(), {
//         props: expect.anything(),
//         type: "filterOptions"
//       });
//     });
//   });

//   describe("clearSearchText", () => {
//     beforeEach(() => (action.type = "clearSearchText"));

//     it("should clear", () => {
//       selectReducer(state, action, selectReducer);
//       expect(selectReducer).toBeCalledWith(expect.anything(), {
//         props: expect.anything(),
//         type: "setSearchText",
//         payload: ""
//       });
//     });
//   });

//   describe("updatePlaceholder", () => {
//     beforeEach(() => (action.type = "updatePlaceholder"));

//     it("should update placeholder to selection", () => {
//       state.areOptionsOpen = true;
//       action.props.multiple = false;
//       action.props.hasOptions = true;
//       action.props.hasSelection = true;
//       action.props.selection = [{ label: "test", value: "test" }];

//       expect(selectReducer(state, action, selectReducer).placeholder).toBe(
//         "test"
//       );
//     });

//     it("should update placeholder default", () => {
//       state.areOptionsOpen = true;
//       action.props.multiple = false;
//       action.props.hasOptions = true;
//       action.props.hasSelection = false;
//       action.props.text_placeholder = "default";

//       expect(selectReducer(state, action, selectReducer).placeholder).toBe(
//         "default"
//       );
//     });
//   });

//   describe("setWidth", () => {
//     beforeEach(() => (action.type = "setWidth"));

//     it("should set width", () => {
//       action.payload = {
//         current: {
//           offsetWidth: 100
//         }
//       };

//       expect(selectReducer(state, action, selectReducer).width).toBe(100);
//     });

//     it("should set width to default of 0", () => {
//       expect(selectReducer(state, action, selectReducer).width).toBe(0);
//     });
//   });

//   describe("selectionUpdated", () => {
//     beforeEach(() => (action.type = "selectionUpdated"));

//     it("should clear hightlighted without selection", () => {
//       action.props.hasSelection = false;

//       selectReducer(state, action, selectReducer);

//       expect(selectReducer).toBeCalledWith(expect.anything(), {
//         props: expect.anything(),
//         type: "clearSelectionHighlighted"
//       });

//       expect(selectReducer).toBeCalledWith(expect.anything(), {
//         props: expect.anything(),
//         type: "updatePlaceholder"
//       });

//       expect(selectReducer).toBeCalledWith(expect.anything(), {
//         props: expect.anything(),
//         type: "filterOptions"
//       });
//     });

//     it("should update selection", () => {
//       action.props.hasSelection = true;
//       action.props.selection = [{ label: "test", value: "test" }];

//       selectReducer(state, action, selectReducer);

//       expect(selectReducer).not.toBeCalledWith(expect.anything(), {
//         props: expect.anything(),
//         type: "clearSelectionHighlighted"
//       });

//       expect(selectReducer).toBeCalledWith(expect.anything(), {
//         props: expect.anything(),
//         type: "filterOptions"
//       });
//     });
//   });

//   describe("clearOptionHighlighted", () => {
//     beforeEach(() => (action.type = "clearOptionHighlighted"));

//     it("should clear", () => {
//       expect(
//         selectReducer(state, action, selectReducer).optionHighlighted
//       ).toBeNull();
//     });
//   });

//   describe("clearSelectionHighlighted", () => {
//     beforeEach(() => (action.type = "clearSelectionHighlighted"));

//     it("should clear", () => {
//       expect(
//         selectReducer(state, action, selectReducer).selectionHighlighted
//       ).toBeNull();
//     });
//   });

//   describe("setOptionHighlighted", () => {
//     beforeEach(() => (action.type = "setOptionHighlighted"));

//     it("should do nothing without payload", () => {
//       expect(selectReducer(state, action)).toBe(state);
//       expect(selectReducer(state, action)).toStrictEqual(state);
//     });

//     it("should clear when closed", () => {
//       action.payload = { value: "hightlighted", label: "hightlighted" };
//       state.areOptionsOpen = false;
//       state.filteredOptions = [{ value: "something", label: "something" }];

//       selectReducer(state, action, selectReducer);

//       expect(selectReducer).toBeCalledWith(expect.anything(), {
//         props: expect.anything(),
//         type: "clearHighlighted"
//       });
//     });

//     it("should clear without options", () => {
//       action.payload = { value: "hightlighted", label: "hightlighted" };
//       state.areOptionsOpen = true;
//       state.filteredOptions = [];

//       selectReducer(state, action, selectReducer);

//       expect(selectReducer).toBeCalledWith(expect.anything(), {
//         props: expect.anything(),
//         type: "clearHighlighted"
//       });
//     });

//     it("should set hightlighted", () => {
//       action.payload = { value: "hightlighted", label: "hightlighted" };
//       state.areOptionsOpen = true;
//       state.filteredOptions = [
//         { value: "hightlighted", label: "hightlighted" }
//       ];

//       let newState = selectReducer(state, action, selectReducer);

//       expect(newState.optionHighlighted).toBe(action.payload);
//       expect(newState.selectionHighlighted).toBeNull();
//     });
//   });

//   describe("setSelectionHighlighted", () => {
//     beforeEach(() => (action.type = "setSelectionHighlighted"));

//     it("should do nothing without payload", () => {
//       expect(selectReducer(state, action)).toBe(state);
//       expect(selectReducer(state, action)).toStrictEqual(state);
//     });

//     it("should clear without selection", () => {
//       action.payload = { value: "hightlighted", label: "hightlighted" };
//       action.props.hasSelection = false;

//       selectReducer(state, action, selectReducer);

//       expect(selectReducer).toBeCalledWith(expect.anything(), {
//         props: expect.anything(),
//         type: "clearHighlighted"
//       });
//     });

//     it("should set hightlighted", () => {
//       action.payload = { value: "hightlighted", label: "hightlighted" };
//       action.props.hasSelection = true;
//       action.props.selection = [
//         { value: "hightlighted", label: "hightlighted" }
//       ];

//       let newState = selectReducer(state, action, selectReducer);

//       expect(newState.selectionHighlighted).toBe(action.payload);
//       expect(newState.optionHighlighted).toBeNull();
//     });
//   });

//   describe("clearHighlighted", () => {
//     beforeEach(() => (action.type = "clearHighlighted"));

//     it("should clear", () => {
//       let newState = selectReducer(state, action, selectReducer);

//       expect(newState.selectionHighlighted).toBeNull();
//       expect(newState.optionHighlighted).toBeNull();
//     });
//   });

//   describe("moveSelectionHighlighted", () => {
//     beforeEach(() => (action.type = "moveSelectionHighlighted"));

//     it("should move hightlighted", () => {
//       state.selectionHighlighted = "test";
//       action.props.selection = [{ value: "test", label: "test" }];
//       action.payload = "payload";

//       selectReducer(state, action, selectReducer);

//       expect(moveHighlighted).toBeCalledWith(
//         action.props.selection,
//         action.payload,
//         state.selectionHighlighted,
//         true
//       );

//       expect(selectReducer).toBeCalledWith(expect.anything(), {
//         props: expect.anything(),
//         type: "setSelectionHighlighted",
//         payload: "test"
//       });
//     });
//   });

//   describe("moveOptionHighlighted", () => {
//     beforeEach(() => (action.type = "moveOptionHighlighted"));

//     it("should move hightlighted", () => {
//       state.optionHighlighted = "test";
//       state.filteredOptions = [{ value: "test", label: "test" }];
//       action.payload = "payload";

//       selectReducer(state, action, selectReducer);

//       expect(moveHighlighted).toBeCalledWith(
//         action.props.selection,
//         action.payload,
//         state.optionHighlighted
//       );

//       expect(selectReducer).toBeCalledWith(expect.anything(), {
//         props: expect.anything(),
//         type: "setOptionHighlighted",
//         payload: "test"
//       });
//     });
//   });

//   describe("setValidOptionHighlighted", () => {
//     beforeEach(() => (action.type = "setValidOptionHighlighted"));

//     it("should move hightlighted", () => {
//       state.areOptionsOpen = true;
//       state.selectionHighlighted = null;
//       state.optionHighlighted = "removed";
//       state.filteredOptions = [{ value: "test", label: "test" }];

//       selectReducer(state, action, selectReducer);

//       expect(selectReducer).toBeCalledWith(expect.anything(), {
//         props: expect.anything(),
//         type: "moveOptionHighlighted",
//         payload: 0
//       });
//     });

//     it("should not move hightlighted", () => {
//       state.areOptionsOpen = true;
//       state.selectionHighlighted = null;
//       state.optionHighlighted = "test";
//       state.filteredOptions = [{ value: "test", label: "test" }];

//       selectReducer(state, action, selectReducer);

//       expect(selectReducer(state, action)).toBe(state);
//       expect(selectReducer(state, action)).toStrictEqual(state);
//     });
//   });

//   describe("filterOptions", () => {
//     beforeEach(() => (action.type = "filterOptions"));

//     it("should filter options", () => {
//       state.optionHighlighted = "filtered";
//       action.props.filterOptions = () => [
//         { value: "filtered", label: "filtered" }
//       ];

//       expect(
//         selectReducer(state, action, selectReducer).filteredOptions
//       ).toStrictEqual(action.props.filterOptions());

//       expect(selectReducer).not.toBeCalledWith(expect.anything(), {
//         props: expect.anything(),
//         type: "setValidOptionHighlighted"
//       });
//     });

//     it("should filter options and set hightlighted", () => {
//       state.optionHighlighted = null;
//       action.props.filterOptions = () => [
//         { value: "filtered", label: "filtered" }
//       ];

//       expect(
//         selectReducer(state, action, selectReducer).filteredOptions
//       ).toStrictEqual(action.props.filterOptions());

//       expect(selectReducer).toBeCalledWith(expect.anything(), {
//         props: expect.anything(),
//         type: "setValidOptionHighlighted"
//       });
//     });

//     it("should filter options and clear hightlighted", () => {
//       state.optionHighlighted = "something";
//       action.props.filterOptions = () => [];

//       expect(
//         selectReducer(state, action, selectReducer).filteredOptions
//       ).toStrictEqual(action.props.filterOptions());

//       expect(selectReducer).toBeCalledWith(expect.anything(), {
//         props: expect.anything(),
//         type: "clearOptionHighlighted"
//       });
//     });

//     it("should add creatable option", () => {
//       state.searchText = "search";
//       action.props.creatable = true;
//       action.props.filterOptions = () => [
//         { value: "filtered", label: "filtered" }
//       ];

//       let expectedOptions = action.props.filterOptions();
//       expectedOptions.push({ value: "search", label: 'Create "search"' });

//       expect(
//         selectReducer(state, action, selectReducer).filteredOptions
//       ).toStrictEqual(expectedOptions);
//     });

//     it("should not make create option if the option already exists", () => {
//       state.searchText = "search";
//       action.props.creatable = true;
//       action.props.filterOptions = () => [{ value: "search", label: "search" }];

//       expect(
//         selectReducer(state, action, selectReducer).filteredOptions
//       ).toStrictEqual(action.props.filterOptions());
//     });

//     it("should not allow duplicate selections", () => {
//       state.searchText = "search";
//       action.props.creatable = true;
//       action.props.allowDuplicates = false;
//       action.props.selection = [{ value: "search", label: "search" }];
//       action.props.filterOptions = () => [
//         { value: "something", label: "something" }
//       ];

//       expect(
//         selectReducer(state, action, selectReducer).filteredOptions
//       ).toStrictEqual(action.props.filterOptions());
//     });
//   });
// });

// describe("mergeState", () => {
//   it("should merge", () => {
//     expect(
//       mergeState({ something: 1, other: 2 }, { something: "new" })
//     ).toStrictEqual({ something: "new", other: 2 });
//   });

//   it("should not change", () => {
//     let state = { something: 1, other: 2 };

//     let output = mergeState(state, { something: 1 });

//     expect(output).toBe(state);
//     expect(output).toStrictEqual(state);
//   });
// });
