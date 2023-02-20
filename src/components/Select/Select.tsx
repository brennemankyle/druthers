import React, { useReducer, useRef, useEffect, ReactElement } from "react";
import styled from "@emotion/styled";
import { RawSelectProps } from "../../utils/SelectTypes";
import defaultProps from "../../utils/defaultProps";
import { last } from "../../utils/utils";
import ReactDOM from "react-dom";
import { withKeys, noop } from "../../utils/utils";
import callOnChange from "../../utils/callOnChange";
import useUpdateSelection from "../../hooks/useUpdateSelection/useUpdateSelection";
import KEY_CODE from "../../utils/KEY_CODE";

function targetHasValue(e): boolean {
  return e.target.hasAttribute("value") || e.target.hasAttribute("data-val");
}

function targetValue(e): string {
  return String(e.target.value || e.target.getAttribute("data-val") || "");
}

function Select(rawProps: Partial<RawSelectProps>): ReactElement {
  let props = rawProps.massaged ? rawProps : rawProps.massageDataIn(rawProps);
  const selfRef = useRef(null);
  const [state, dispatch] = useReducer(props.selectReducer, {
    areOptionsOpen: false,
    searchText: "",
    placeholder: props.text_placeholder,
    optionHighlighted: null,
    selectionHighlighted: null,
    width: 0,
    filteredOptions: props.filterOptions(props, ""),
  });
  const {
    areOptionsOpen,
    searchText,
    placeholder,
    optionHighlighted,
    selectionHighlighted,
    width,
    filteredOptions,
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
    styles_optionsAlwaysOpen: props.optionsAlwaysOpen,
    ...withKeys(props, "styles_"),
  };

  if (!props.hasOptions && !props.creatable) {
    console.error(
      "Select has no options and is not creatable, nothing to display. Consider adding options or making it creatable"
    );
  }

  let selectOption = (option) => {
    if (!props.multiple) {
      document.activeElement.blur(); // Close options on single select
    }

    callOnChange(props, option);
  };
  let removeSelectionItem = (selectionItem) => {
    if (props.removable) {
      callOnChange(props, selectionItem, "remove");
      dispatch({ props, type: "clearSearchText" });
    }
  };

  // Events
  let onFocus = (e) => {
    dispatch({ props, type: "openOptions" });

    props.onFocus(e);
  };
  let onBlur = (e) => {
    if (props.singleNoOptions) {
      callOnChange(props, targetValue(e)); // Make single no options behave like text input
    }

    dispatch({ props, type: "closeOptions" });

    props.onBlur(e);
  };
  let onOptionClick = (e) => {
    if (!targetHasValue(e)) return; // no value, do nothing

    selectOption(targetValue(e));
  };
  let onRemove = (e) => {
    if (e.target.classList.contains("remove") && targetHasValue(e)) {
      removeSelectionItem(targetValue(e));
    }
  };
  let onHoverOption = (e) => {
    if (targetHasValue(e))
      dispatch({
        props,
        type: "setOptionHighlighted",
        payload: targetValue(e),
      });
  };
  let onHoverSelection = (e) => {
    if (!e.target.classList.contains("remove")) return;

    if (targetHasValue(e))
      dispatch({
        props,
        type: "setSelectionHighlighted",
        payload: targetValue(e),
      });
  };
  let onSelectionOut = (e) => {
    if (!areOptionsOpen) dispatch({ props, type: "clearSelectionHighlighted" }); // Stop highlighting selection if mouse leaves select area
  };
  let onKeyDown = (e) => {
    if (!areOptionsOpen && KEY_CODE.isOpenKeyCode(e.keyCode)) {
      dispatch({ props, type: "openOptions" });
    }

    switch (e.keyCode) {
      case KEY_CODE.TAB:
      case KEY_CODE.ENTER_KEY:
        if (areOptionsOpen && optionHighlighted != null) {
          dispatch({ props, type: "moveOptionHighlighted", payload: 1 });
          dispatch({ props, type: "clearSearchText" });
          selectOption(optionHighlighted);
        }
        break;
      case KEY_CODE.ARROW_UP:
        dispatch({ props, type: "moveOptionHighlighted", payload: -1 });
        break;
      case KEY_CODE.ARROW_DOWN:
        dispatch({ props, type: "moveOptionHighlighted", payload: 1 });
        break;
      case KEY_CODE.ARROW_LEFT:
        dispatch({ props, type: "moveSelectionHighlighted", payload: -1 });
        break;
      case KEY_CODE.ARROW_RIGHT:
        dispatch({ props, type: "moveSelectionHighlighted", payload: 1 });
        break;
      case KEY_CODE.ESCAPE:
        dispatch({ props, type: "closeOptions" });
        break;
      case KEY_CODE.BACKSPACE:
      case KEY_CODE.DELETE:
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
    onFocus =
      onBlur =
      onOptionClick =
      onKeyDown =
      onRemove =
      onHoverOption =
        noop;
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
    component_OverlayOptionsWrapper: OverlayOptionsWrapper,
    component_InPlaceOptionsWrapper: InPlaceOptionsWrapper,
    component_AppendToBodyOptionsWrapper: AppendToBodyOptionsWrapper,
    component_StyledAppendToBodyOptionsWrapper:
      StyledAppendToBodyOptionsWrapper,
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

  const DivRelative = styled.div`
    position: relative;
  `;

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
              onChange={(e) => {
                dispatch({ props, type: "clearOptionHighlighted" });
                dispatch({
                  props,
                  type: "setSearchText",
                  payload: targetValue(e),
                });
              }}
              {...styles}
            />
          }
        />

        {!props.appendToBody &&
          (areOptionsOpen || props.optionsAlwaysOpen) &&
          props.overlayOptions && (
            <DivRelative>
              <OverlayOptionsWrapper {...styles}>
                {optionList}
              </OverlayOptionsWrapper>
            </DivRelative>
          )}

        {!props.appendToBody &&
          (areOptionsOpen || props.optionsAlwaysOpen) &&
          !props.overlayOptions && (
            <InPlaceOptionsWrapper {...styles}>
              {optionList}
            </InPlaceOptionsWrapper>
          )}

        {props.appendToBody &&
          (areOptionsOpen || props.optionsAlwaysOpen) &&
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
}

Select.defaultProps = defaultProps;

export default Select;
