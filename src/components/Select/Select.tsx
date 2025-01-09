import React, {
  useReducer,
  useRef,
  useEffect,
  ReactElement,
  forwardRef,
  MouseEvent,
  FocusEvent,
  SyntheticEvent,
  KeyboardEvent,
  ChangeEvent,
} from "react";
import styled from "@emotion/styled";
import { MassagedSelectProps, RawSelectProps } from "../../utils/SelectTypes";
import defaultProps from "../../utils/defaultProps";
import { last } from "../../utils/utils";
import ReactDOM from "react-dom";
import { withKeys, noop } from "../../utils/utils";
import callOnChange from "../../utils/callOnChange";
import useUpdateSelection from "../../hooks/useUpdateSelection/useUpdateSelection";
import KEY_CODE from "../../utils/KEY_CODE";

function targetHasValue(e: MouseEvent<HTMLElement>): boolean {
  return (
    (e.target as HTMLElement).hasAttribute("value") ||
    (e.target as HTMLElement).hasAttribute("data-val")
  );
}

function targetValue(e: SyntheticEvent<HTMLElement>): string {
  return String(
    (e.target as HTMLInputElement).value ||
      (e.target as HTMLInputElement).getAttribute("data-val") ||
      ""
  );
}

const Select = forwardRef(function Select(
  rawProps: RawSelectProps,
  ref
): ReactElement {
  const massageDataIn = rawProps.massageDataIn ?? defaultProps.massageDataIn;

  let props: MassagedSelectProps = rawProps.massaged
    ? (rawProps as unknown as MassagedSelectProps)
    : massageDataIn(rawProps, defaultProps);
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
    ...withKeys(props, "styles_"),
    styles_width: width,
    styles_multiple: props.multiple,
    styles_disabled: props.disabled,
    styles_hasSelection: props.hasSelection,
    styles_hasOptions: props.hasOptions,
    styles_optionHighlighted: optionHighlighted,
    styles_selectionHighlighted: selectionHighlighted,
    styles_rightToLeft: props.rightToLeft,
    styles_optionsAlwaysOpen: props.optionsAlwaysOpen,
    styles_searchable: props.searchable,
  };

  if (!props.hasOptions && !props.creatable) {
    console.error(
      "Select has no options and is not creatable, nothing to display. Consider adding options or making it creatable"
    );
  }

  let selectOption = (option: string) => {
    if (!props.multiple && document.activeElement) {
      (document.activeElement as HTMLDivElement).blur(); // Close options on single select
    }

    callOnChange(props, option);
  };
  let removeSelectionItem = (selectionItem: string) => {
    if (props.removable) {
      callOnChange(props, selectionItem, "remove");
      dispatch({ props, type: "clearSearchText" });
    }
  };

  // Events
  let onFocus = (e: FocusEvent<HTMLInputElement>) => {
    dispatch({ props, type: "openOptions" });

    props.onFocus(e);
  };
  let onBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (props.singleNoOptions) {
      callOnChange(props, targetValue(e)); // Make single no options behave like text input
    }

    dispatch({ props, type: "closeOptions" });

    props.onBlur(e);
  };
  let onOptionClick = (e: MouseEvent<HTMLUListElement>) => {
    if (!targetHasValue(e)) return; // no value, do nothing

    selectOption(targetValue(e));
  };
  let onRemove = (e: MouseEvent<HTMLUListElement>) => {
    if (
      (e.target as HTMLUListElement).classList.contains("remove") &&
      targetHasValue(e)
    ) {
      removeSelectionItem(targetValue(e));
    }
  };
  let onHoverOption = (e: MouseEvent<HTMLUListElement>) => {
    if (targetHasValue(e))
      dispatch({
        props,
        type: "setOptionHighlighted",
        payload: targetValue(e),
      });
  };
  let onHoverSelection = (e: MouseEvent<HTMLUListElement>) => {
    if (!(e.target as HTMLUListElement).classList.contains("remove")) return;

    if (targetHasValue(e))
      dispatch({
        props,
        type: "setSelectionHighlighted",
        payload: targetValue(e),
      });
  };
  let onSelectionOut = (e: MouseEvent<HTMLUListElement>) => {
    if (!areOptionsOpen) dispatch({ props, type: "clearSelectionHighlighted" }); // Stop highlighting selection if mouse leaves select area
  };
  let onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
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
        const lastItem = last(props.selection);
        if (!searchText && props.hasSelection && lastItem) {
          // Only remove if there isn't search text
          let selectionItem = lastItem.value;

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

  if (!props.hasOptions && !props.creatable) {
    return <></>;
  }

  return (
    <Wrapper {...styles} ref={selfRef}>
      {props.name && (
        <HtmlFieldData name={props.name} itemList={props.selection} />
      )}

      <SelectionWrapper
        onFocus={onFocus}
        onBlur={onBlur}
        ref={ref}
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
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
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
            StyledAppendToBodyOptionsWrapper={StyledAppendToBodyOptionsWrapper}
            updateOn={[props.selection]}
          >
            {optionList}
          </AppendToBodyOptionsWrapper>,
          document.body
        )}
    </Wrapper>
  );
});

export default Select;
