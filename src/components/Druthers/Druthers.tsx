import React, {
  useState,
  useEffect,
  useRef,
  ReactElement,
  forwardRef,
} from "react";
import {
  AnyReactComponent,
  MassagedSelectProps,
  RawSelectProps,
} from "../../utils/SelectTypes";
import defaultProps from "../../utils/defaultProps";
import useWindowWidth from "../../hooks/useWindowWidth/useWindowWidth";
import Select from "../Select/Select";
import CheckRadio from "../CheckRadio/CheckRadio";
import { CheckBox, Radio, Switch } from "../SingleCheckRadio/styled";

interface Props {
  component_Select: AnyReactComponent;
  component_CheckRadio: AnyReactComponent;
  component_CheckBox: AnyReactComponent;
  component_Radio: AnyReactComponent;
  component_Switch: AnyReactComponent;
}

type RawDruthersProps = Partial<Props> & RawSelectProps;

type MassagedDruthersProps = Props & MassagedSelectProps;

const druthersDefaultProps: MassagedDruthersProps = {
  ...defaultProps,
  component_Select: Select,
  component_CheckRadio: CheckRadio,
  component_CheckBox: CheckBox,
  component_Radio: Radio,
  component_Switch: Switch,
};

function hasOverflownX(element: HTMLElement): boolean {
  return element.scrollWidth > element.offsetWidth;
}

const Druthers = forwardRef(function Druthers(
  rawProps: RawDruthersProps,
  ref
): ReactElement {
  const massageDataIn =
    rawProps.massageDataIn ?? druthersDefaultProps.massageDataIn;

  let props = massageDataIn<MassagedDruthersProps>(
    rawProps,
    druthersDefaultProps
  );
  const canCheckRadio =
    props.options.length <= props.checkRadioMaxCount &&
    !props.creatable &&
    !props.hasOptionGroups;
  const checkRadioRef = useRef<HTMLInputElement>(null);
  const windowWidth = useWindowWidth();
  const [isLoading, setIsLoading] = useState(canCheckRadio); // Only show CheckRadio after we've loaded
  const [isOverflown, setIsOverflown] = useState(false);
  useEffect(() => {
    if (canCheckRadio && checkRadioRef.current)
      setIsOverflown(hasOverflownX(checkRadioRef.current));
    if (isLoading) setIsLoading(false);
  }, [props.options, props.creatable, windowWidth, canCheckRadio, isLoading]);

  let hideCheckRadio = isLoading || isOverflown;
  let checkRadioStyle: any = { whiteSpace: "nowrap", overflow: "visible" }; // Make sure we can calculate if CheckRadio has overflown

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

  return canCheckRadio && !isOverflown ? (
    <CheckRadio
      style={checkRadioStyle}
      ref={checkRadioRef}
      {...props}
      massaged={true}
      key="CheckRadio"
    />
  ) : (
    <Select {...props} massaged={true} ref={ref} key="Select" />
  );
});

export default Druthers;
