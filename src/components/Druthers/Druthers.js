import React, { useState, useEffect, useRef } from "react";
import AppPropTypes, { selectPropsTypes } from "../../utils/AppPropTypes";
import defaultProps from "../../utils/defaultProps";
import useWindowWidth from "../../hooks/useWindowWidth/useWindowWidth";
import Select from "../Select/Select";
import CheckRadio from "../CheckRadio/CheckRadio";
import { CheckBox, Radio, Switch } from "../SingleCheckRadio/styled";

let hasOverflownX = (element) => element.scrollWidth > element.offsetWidth;

let Druthers = (rawProps) => {
  let props = rawProps.massageDataIn(rawProps);
  const canCheckRadio =
    props.options.length <= props.checkRadioMaxCount &&
    !props.creatable &&
    !props.hasOptionGroups;
  const checkRadioRef = useRef(null);
  const windowWidth = useWindowWidth();
  const [isLoading, setIsLoading] = useState(canCheckRadio); // Only show CheckRadio after we've loaded
  const [isOverflown, setIsOverflown] = useState(false);
  useEffect(() => {
    if (canCheckRadio) setIsOverflown(hasOverflownX(checkRadioRef.current));
    if (isLoading) setIsLoading(false);
  }, [props.options, props.creatable, windowWidth, canCheckRadio, isLoading]);

  let hideCheckRadio = isLoading || isOverflown;
  let checkRadioStyle = { whiteSpace: "nowrap", overflow: "visible" }; // Make sure we can calculate if CheckRadio has overflown

  if (hideCheckRadio) {
    checkRadioStyle = {
      ...checkRadioStyle,
      opacity: 1,
      height: 0,
      overflowY: "hidden",
    };
  }

  if (!props.hasOptions && !props.creatable) {
    console.error(
      "Select has no options and is not creatable, nothing to display. Consider adding options or making it creatable"
    );
  }

  let { component_CheckRadio: CheckRadio, component_Select: Select } = props;

  return [
    canCheckRadio && (
      <CheckRadio
        style={checkRadioStyle}
        ref={checkRadioRef}
        {...props}
        massaged={true}
        key="CheckRadio"
      />
    ),
    (!canCheckRadio || isOverflown) && (
      <Select {...props} massaged={true} key="Select" />
    ),
  ];
};

Druthers.defaultProps = {
  ...defaultProps,
  component_Select: Select,
  component_CheckRadio: CheckRadio,
  component_CheckBox: CheckBox,
  component_Radio: Radio,
  component_Switch: Switch,
};

Druthers.propTypes = {
  ...selectPropsTypes,
  component_Select: AppPropTypes.element.isRequired,
  component_CheckRadio: AppPropTypes.element.isRequired,
  component_CheckBox: AppPropTypes.element.isRequired,
  component_Radio: AppPropTypes.element.isRequired,
  component_Switch: AppPropTypes.element.isRequired,
};

export default Druthers;
