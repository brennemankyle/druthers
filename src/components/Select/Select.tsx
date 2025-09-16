import React, {
  useReducer,
  useRef,
  useEffect,
  ReactElement,
  forwardRef,
  MouseEvent,
  FocusEvent,
  KeyboardEvent,
  ChangeEvent,
  MutableRefObject,
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

const OverlayContainer = styled.div(
  (props: any) => `
  position: relative;
  max-height: ${props.styles_optionsWrapper_maxHeight};
  width: ${props.styles_width}px;
`
);

function hasValue(target: HTMLElement): boolean {
  return target.hasAttribute("value") || target.hasAttribute("data-val");
}

function getValue(target: HTMLElement): string {
  return String(
    (target as HTMLInputElement).value ||
      (target as HTMLInputElement).getAttribute("data-val") ||
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
  const selfRef = useRef<MutableRefObject<HTMLDivElement>>(null);
  const [state, dispatch] = useReducer(props.selectReducer, {
    areOptionsOpen: props.optionsAlwaysOpen,
    isFocused: false,
    showTruncated: false,
    searchText: "",
    placeholder: props.text_placeholder,
    optionHighlighted: null,
    selectionHighlighted: null,
    width: 0,
    filteredOptions: props.filterOptions(props, ""),
  });
  const {
    areOptionsOpen,
    isFocused,
    showTruncated,
    searchText,
    placeholder,
    optionHighlighted,
    selectionHighlighted,
    width,
    filteredOptions,
  } = state;
  useEffect(() => {
    dispatch({ props, type: "setWidth", payload: selfRef });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    areOptionsOpen,
    selfRef,
    selfRef?.current,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    (selfRef?.current as any)?.offsetWidth,
  ]);
  useEffect(() => {
    dispatch({ props, type: "selectionUpdated" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.selection]);
  useUpdateSelection(props); // Update selection based on prop changes

  const stylesWithoutHighlightedOptions = {
    ...withKeys(props, "styles_"),
    styles_width: width,
    styles_multiple: props.multiple,
    styles_disabled: props.disabled,
    styles_hasSelection: props.hasSelection,
    styles_hasOptions: props.hasOptions,
    styles_selectionHighlighted: selectionHighlighted,
    styles_rightToLeft: props.rightToLeft,
    styles_optionsAlwaysOpen: props.optionsAlwaysOpen,
    styles_searchable: props.searchable,
  };

  const styles = {
    ...stylesWithoutHighlightedOptions,
    styles_optionHighlighted: optionHighlighted,
  };

  if (!props.hasOptions && !props.creatable) {
    console.error(
      "Select has no options and is not creatable, nothing to display. Consider adding options or making it creatable"
    );
  }

  let selectOption = (option: string) => {
    if (
      !props.multiple &&
      selfRef.current &&
      document.activeElement ===
        (selfRef.current as any).querySelector("input.druthers-search")
    ) {
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
    dispatch({ props, type: "setIsFocused", payload: true });

    props.onFocus(e);
  };
  let onBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (props.singleNoOptions) {
      callOnChange(props, getValue(e.target as HTMLElement)); // Make single no options behave like text input
    }

    dispatch({ props, type: "closeOptions" });
    dispatch({ props, type: "setIsFocused", payload: false });

    props.onBlur(e);
  };
  let onOptionClick = (e: MouseEvent<HTMLUListElement>) => {
    if (props.preventDisplayElementOptionClick) {
      e.preventDefault(); // Make custom display elements like links not fire when selecting an option
    }

    const li = (e.target as HTMLElement).closest("li");
    const target: HTMLLIElement = li || (e.target as HTMLLIElement);

    if (!hasValue(target)) {
      if (
        target &&
        (target.classList.contains("truncate-show") ||
          target.classList.contains("truncate-hide"))
      ) {
        dispatch({
          props,
          type: "setShowTruncated",
          payload: target.classList.contains("truncate-show"),
        });
      }
      return; // no value, do nothing
    }

    selectOption(getValue(target));
  };
  let onRemove = (e: MouseEvent<HTMLUListElement>) => {
    if (
      (e.target as HTMLUListElement).classList.contains("remove") &&
      hasValue(e.target as HTMLElement)
    ) {
      removeSelectionItem(getValue(e.target as HTMLElement));
    }
  };
  let onHoverOption = (e: MouseEvent<HTMLUListElement>) => {
    if (hasValue(e.target as HTMLElement))
      dispatch({
        props,
        type: "setOptionHighlighted",
        payload: getValue(e.target as HTMLElement),
      });
  };
  let onHoverSelection = (e: MouseEvent<HTMLUListElement>) => {
    if (!(e.target as HTMLUListElement).classList.contains("remove")) return;

    if (hasValue(e.target as HTMLElement))
      dispatch({
        props,
        type: "setSelectionHighlighted",
        payload: getValue(e.target as HTMLElement),
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

  let showSelection = props.multiple || !isFocused; // Multiple: always show. Single: show when options are closed
  let showSearch = props.multiple || isFocused || !props.hasSelection; // Multiple: always show. Single: show when options are open or when nothing is selected (placeholder should be shown)
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
      className="druthers-option-list"
      itemList={filteredOptions}
      onClick={onOptionClick}
      onMouseOver={onHoverOption}
      Item={Option}
      noItemsText={
        props.hasOptions ? props.text_noOptions : props.text_create + "..."
      }
      text_truncatedShow={props.text_truncatedShow}
      text_truncatedHide={props.text_truncatedHide}
      truncateOptions={props.truncateOptions}
      showTruncated={showTruncated}
      {...styles}
    />
  );

  if (!props.hasOptions && !props.creatable) {
    return <></>;
  }

  return (
    <Wrapper {...styles} ref={selfRef} className={props.className}>
      {props.name && (
        <HtmlFieldData name={props.name} itemList={props.selection} />
      )}

      <SelectionWrapper
        className="druthers-selection-wrapper"
        onFocus={onFocus}
        onBlur={onBlur}
        ref={ref}
        svg_Expand={props.svg_Expand}
        {...styles}
        areOptionsOpen={areOptionsOpen}
        SelectionList={
          showSelection && (
            <SelectionList
              className="druthers-selection-list"
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
            className="druthers-search"
            hide={!showSearch}
            placeholder={placeholder}
            searchText={searchText}
            onKeyDown={onKeyDown}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              dispatch({ props, type: "clearOptionHighlighted" });
              dispatch({
                props,
                type: "setSearchText",
                payload: getValue(e.target as HTMLElement),
              });
            }}
            {...styles}
          />
        }
      />

      {!props.appendToBody && props.overlayOptions && areOptionsOpen && (
        <OverlayContainer {...stylesWithoutHighlightedOptions}>
          <OverlayOptionsWrapper
            className="options-wrapper druthers-overlay-options-wrapper"
            {...stylesWithoutHighlightedOptions}
          >
            {optionList}
          </OverlayOptionsWrapper>
        </OverlayContainer>
      )}

      {!props.appendToBody && !props.overlayOptions && areOptionsOpen && (
        <InPlaceOptionsWrapper
          className="options-wrapper druthers-in-place-options-wrapper"
          {...stylesWithoutHighlightedOptions}
        >
          {optionList}
        </InPlaceOptionsWrapper>
      )}

      {props.appendToBody &&
        areOptionsOpen &&
        ReactDOM.createPortal(
          <AppendToBodyOptionsWrapper
            {...stylesWithoutHighlightedOptions}
            className="options-wrapper druthers-append-to-body-options-wrapper"
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
