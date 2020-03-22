import React, { useReducer, useRef, useEffect } from "react";
import { simpleDruthersPropTypes } from "../../utils/AppPropTypes";
import defaultProps from "../../utils/defaultProps";
import { last, inRange } from "../../utils/essentialLodash";
import ReactDOM from "react-dom";
import { DivRelative } from "../styledComponents/styledComponents";
import withKeys from "../../utils/withKeys";
import callOnChange from "../../utils/callOnChange";
import useUpdateSelection from "../../hooks/useUpdateSelection/useUpdateSelection";
import {
  ENTER_KEY,
  ESCAPE,
  SPACE,
  BACKSPACE,
  DELETE,
  ARROW_UP,
  ARROW_DOWN,
  ARROW_LEFT,
  ARROW_RIGHT,
  NUM_LETTER_START,
  NUM_LETTER_END,
  SEMI_COLON,
  EQUAL_SIGN,
  COMMA,
  DASH,
  PERIOD,
  FORWARD_SLASH,
  OPEN_BRACKET,
  BACK_SLASH,
  CLOSE_BRAKET,
  SINGLE_QUOTE,
  TAB
} from "../../utils/keyCodes";

let targetHasValue = e =>
  e.target.hasAttribute("value") || e.target.hasAttribute("val");
let targetValue = e =>
  String(e.target.value || e.target.getAttribute("val") || "");

let Select = rawProps => {
  let props = rawProps.massaged ? rawProps : rawProps.massageDataIn(rawProps);
  const selfRef = useRef(null);
  const [state, dispatch] = useReducer(props.selectReducer, {
    areOptionsOpen: false,
    searchText: "",
    placeholder: props.text_placeholder,
    optionHighlighted: null,
    selectionHighlighted: null,
    width: 0,
    filteredOptions: props.filterOptions(props, "")
  });
  const {
    areOptionsOpen,
    searchText,
    placeholder,
    optionHighlighted,
    selectionHighlighted,
    width,
    filteredOptions
  } = state;
  useEffect(() => {
    dispatch({ props, type: "setWidth", payload: selfRef });
    // eslint-disable-next-line
  }, [areOptionsOpen]);
  useEffect(() => {
    dispatch({ props, type: "selectionUpdated" });
    // eslint-disable-next-line
  }, [props.selection]);
  useUpdateSelection(props); // Update selection based on prop changes

  let styles = {
    styles_width: width,
    styles_multiple: props.multiple,
    styles_disabled: props.disabled,
    styles_hasSelection: props.hasSelection,
    styles_hasOptions: props.hasOptions,
    styles_optionHighlighted: optionHighlighted,
    styles_selectionHighlighted: selectionHighlighted,
    styles_rightToLeft: props.rightToLeft,
    ...withKeys(props, "styles_")
  };

  if (!props.hasOptions && !props.creatable) {
    console.error(
      "Select has no options and is not creatable, nothing to display. Consider adding options or making it creatable"
    );
  }

  let selectOption = option => {
    if (!props.multiple) {
      document.activeElement.blur(); // Close options on single select
    }

    callOnChange(props, option);
  };
  let removeSelectionItem = selectionItem => {
    if (props.removable) {
      callOnChange(props, selectionItem, "remove");
      dispatch({ props, type: "clearSearchText" });
    }
  };

  // Events
  let onFocus = e => {
    dispatch({ props, type: "openOptions" });

    props.onFocus(e);
  };
  let onBlur = e => {
    if (props.singleNoOptions) {
      callOnChange(props, targetValue(e)); // Make single no options behave like text input
    }

    dispatch({ props, type: "closeOptions" });

    props.onBlur(e);
  };
  let onOptionClick = e => {
    e.preventDefault();
    if (!targetHasValue(e)) return; // no value, do nothing

    selectOption(targetValue(e));
  };
  let onRemove = e => {
    if (e.target.classList.contains("remove") && targetHasValue(e)) {
      removeSelectionItem(targetValue(e));
    }
  };
  let onHoverOption = e => {
    if (targetHasValue(e))
      dispatch({
        props,
        type: "setOptionHighlighted",
        payload: targetValue(e)
      });
  };
  let onHoverSelection = e => {
    if (!e.target.classList.contains("remove")) return;

    if (targetHasValue(e))
      dispatch({
        props,
        type: "setSelectionHighlighted",
        payload: targetValue(e)
      });
  };
  let onSelectionOut = e => {
    if (!areOptionsOpen) dispatch({ props, type: "clearSelectionHighlighted" }); // Stop highlighting selection if mouse leaves select area
  };
  let onKeyDown = e => {
    let openKeys = [
      ENTER_KEY,
      ARROW_UP,
      ARROW_DOWN,
      ARROW_LEFT,
      ARROW_RIGHT,
      SPACE,
      SEMI_COLON,
      EQUAL_SIGN,
      COMMA,
      DASH,
      PERIOD,
      FORWARD_SLASH,
      OPEN_BRACKET,
      BACK_SLASH,
      CLOSE_BRAKET,
      SINGLE_QUOTE
    ];
    if (
      !areOptionsOpen &&
      (inRange(e.keyCode, NUM_LETTER_START, NUM_LETTER_END) ||
        openKeys.includes(e.keyCode))
    )
      dispatch({ props, type: "openOptions" }); // if you type letters, numbers, or openKeys then open options

    switch (e.keyCode) {
      case TAB:
      case ENTER_KEY:
        if (areOptionsOpen && optionHighlighted != null) {
          dispatch({ props, type: "moveOptionHighlighted", payload: 1 });
          dispatch({ props, type: "clearSearchText" });
          selectOption(optionHighlighted);
        }
        break;
      case ARROW_UP:
        dispatch({ props, type: "moveOptionHighlighted", payload: -1 });
        break;
      case ARROW_DOWN:
        dispatch({ props, type: "moveOptionHighlighted", payload: 1 });
        break;
      case ARROW_LEFT:
        dispatch({ props, type: "moveSelectionHighlighted", payload: -1 });
        break;
      case ARROW_RIGHT:
        dispatch({ props, type: "moveSelectionHighlighted", payload: 1 });
        break;
      case ESCAPE:
        dispatch({ props, type: "closeOptions" });
        break;
      case BACKSPACE:
      case DELETE:
        if (!searchText && props.hasSelection) {
          // Only remove if there isn't search text
          let selectionItem = last(props.selection).value;

          if (selectionHighlighted != null) {
            selectionItem = selectionHighlighted;
            dispatch({ props, type: "moveSelectionHighlighted", payload: -1 });
          }

          removeSelectionItem(selectionItem);
        }
        break;
      default:
        break;
    }
  };

  if (props.disabled) {
    onFocus = onBlur = onOptionClick = onKeyDown = onRemove = onHoverOption = () => {};
  }

  let showSelection = props.multiple || !areOptionsOpen; // Multiple: always show. Single: show when options are closed
  let showSearch = props.multiple || areOptionsOpen || !props.hasSelection; // Multiple: always show. Single: show when options are open or when nothing is selected (placeholder should be shown)
  let {
    component_HtmlFieldData: HtmlFieldData,
    component_Wrapper: Wrapper,
    component_Selection: Selection,
    component_SelectionList: SelectionList,
    component_OptionList: OptionList,
    component_Option: Option,
    component_Search: Search,
    component_SelectionWrapper: SelectionWrapper,
    component_OptionsWrapper: OptionsWrapper,
    component_AppendToBodyOptionsWrapper: AppendToBodyOptionsWrapper,
    component_StyledAppendToBodyOptionsWrapper: StyledAppendToBodyOptionsWrapper
  } = props;

  let optionList = (
    <OptionList
      itemList={filteredOptions}
      onClick={onOptionClick}
      onMouseOver={onHoverOption}
      Item={Option}
      noItemsText={
        props.hasOptions ? props.text_noOptions : props.text_create + "..."
      }
      {...styles}
    />
  );

  return (
    (props.hasOptions || props.creatable) && (
      <Wrapper {...styles} ref={selfRef}>
        {props.name && (
          <HtmlFieldData name={props.name} itemList={props.selection} />
        )}

        <SelectionWrapper
          onFocus={onFocus}
          onBlur={onBlur}
          svg_Expand={props.svg_Expand}
          {...styles}
          areOptionsOpen={areOptionsOpen}
          SelectionList={
            showSelection && (
              <SelectionList
                itemList={props.selection}
                onClick={onRemove}
                onMouseOver={onHoverSelection}
                onMouseOut={onSelectionOut}
                removable={!props.disabled && props.removable}
                svg_Remove={props.svg_Remove}
                Item={Selection}
                {...styles}
              />
            )
          }
          Search={
            <Search
              hide={!showSearch}
              placeholder={placeholder}
              searchText={searchText}
              onKeyDown={onKeyDown}
              onChange={e => {
                dispatch({ props, type: "clearOptionHighlighted" });
                dispatch({
                  props,
                  type: "setSearchText",
                  payload: targetValue(e)
                });
              }}
              {...styles}
            />
          }
        />

        {!props.appendToBody && areOptionsOpen && (
          <DivRelative>
            <OptionsWrapper {...styles}>{optionList}</OptionsWrapper>
          </DivRelative>
        )}

        {props.appendToBody &&
          areOptionsOpen &&
          ReactDOM.createPortal(
            <AppendToBodyOptionsWrapper
              {...styles}
              parentRef={selfRef}
              filteredOptions={filteredOptions}
              StyledAppendToBodyOptionsWrapper={
                StyledAppendToBodyOptionsWrapper
              }
              updateOn={[props.selection]}
            >
              {optionList}
            </AppendToBodyOptionsWrapper>,
            document.body
          )}
      </Wrapper>
    )
  );
};

Select.defaultProps = defaultProps;

Select.propTypes = simpleDruthersPropTypes;

export default Select;
