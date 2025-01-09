import React, {
  forwardRef,
  CSSProperties,
  MouseEvent,
  ChangeEvent,
  ForwardedRef,
} from "react";
import {
  AnyReactComponent,
  Item,
  MassagedSelectProps,
  RawSelectProps,
} from "../../utils/SelectTypes";
import defaultProps from "../../utils/defaultProps";
import { withKeys, noop } from "../../utils/utils";
import callOnChange, { CallOnChangeMethod } from "../../utils/callOnChange";
import useUpdateSelection, {
  allBooleanValues,
  isBooleanSwitch,
} from "../../hooks/useUpdateSelection/useUpdateSelection";
import { CheckBox, Radio, Switch } from "../SingleCheckRadio/styled";

interface Props {
  style: CSSProperties;
  className: string;
  massaged: boolean;
  component_CheckBox: AnyReactComponent;
  component_Radio: AnyReactComponent;
  component_Switch: AnyReactComponent;
}

type RawCheckRadioProps = Partial<Props> & RawSelectProps;

type MassagedCheckRadioProps = Props & MassagedSelectProps;

const defaultCheckRadioProps: MassagedCheckRadioProps = {
  ...defaultProps,
  className: "",
  massaged: false,
  style: {},
  component_CheckBox: CheckBox,
  component_Radio: Radio,
  component_Switch: Switch,
};

function CheckRadio(
  rawProps: RawCheckRadioProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const massageDataIn = rawProps.massageDataIn ?? defaultProps.massageDataIn;

  let props: MassagedCheckRadioProps = (
    rawProps.massaged
      ? rawProps
      : massageDataIn<MassagedCheckRadioProps>(rawProps, defaultCheckRadioProps)
  ) as MassagedCheckRadioProps;
  let options = props.options;
  useUpdateSelection(props, true);

  if (
    !props.multiple &&
    props.options.length === 2 &&
    allBooleanValues(props.options)
  ) {
    // Only has boolean values
    options = [
      props.options.find((option) => option.value === "true"),
    ] as Item[]; // This could be a switch, grab 'true' item
  }

  let type = props.multiple ? "checkbox" : "radio";
  let values = props.selection.map((item) => item.value);
  let useSwitch = options.length === 1;

  let onChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = String(e.target.value);
    let method: CallOnChangeMethod = "add";
    if (props.multiple || useSwitch)
      method = e.target.checked ? "add" : "remove";

    if (isBooleanSwitch(props) && !e.target.checked) {
      value = options[0].value === "true" ? "false" : "true";
      method = "add";
    }

    // Don't allow unchecking unless it's removable
    if (props.removable || e.target.checked) callOnChange(props, value, method);
  };

  let radioUncheck = (e: MouseEvent<HTMLInputElement>) => {
    if (
      props.removable &&
      !useSwitch &&
      !props.multiple &&
      props.hasSelection &&
      e.target &&
      props.selection[0].value === String((e.target as HTMLInputElement).value)
    ) {
      // Unchecking radio, onChange event won't fire, so we have to use onClick instead
      callOnChange(props, [], "replace");
    }
  };

  if (props.disabled) {
    onChange = noop;
  }

  let Checkable = useSwitch
    ? props.component_Switch
    : props.multiple
    ? props.component_CheckBox
    : props.component_Radio;

  return (
    <div className={props.className} style={props.style} ref={ref}>
      {options.map((option) => (
        <Checkable
          type={type}
          name={props.name}
          value={option.value}
          disabled={props.disabled}
          onChange={onChange}
          onClick={radioUncheck}
          checked={values.includes(option.value)}
          label={option.displayElement ?? option.label}
          title={option.label}
          multiple={props.multiple}
          toggle={useSwitch}
          svg_Checkmark={props.svg_Checkmark}
          {...withKeys(props, "styles_")}
          key={option.value}
        />
      ))}
    </div>
  );
}

export default forwardRef(CheckRadio);
