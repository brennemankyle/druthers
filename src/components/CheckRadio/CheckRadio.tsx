import React, {
  forwardRef,
  CSSProperties,
  ChangeEventHandler,
  ReactElement,
} from "react";
import { Styles, Item, RawItem } from "../../utils/SelectTypes";
import defaultProps from "../../utils/defaultProps";
import { withKeys, noop } from "../../utils/utils";
import callOnChange from "../../utils/callOnChange";
import useUpdateSelection, {
  allBooleanValues,
  isBooleanSwitch,
} from "../../hooks/useUpdateSelection/useUpdateSelection";
import { CheckBox, Radio, Switch } from "../SingleCheckRadio/styled";
import { MassageDataIn } from "../../utils/massageDataIn";

interface Props extends Styles {
  style: CSSProperties;
  disabled: boolean;
  multiple: boolean;
  selection: Item[];
  options: RawItem[] | Item[];
  massageDataIn: MassageDataIn;
  massaged: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  component_CheckBox: ReactElement;
  component_Radio: ReactElement;
  component_Switch: ReactElement;
  svg_Checkmark: ReactElement;
}

function CheckRadio(rawProps: Props, ref) {
  let props = rawProps.massaged ? rawProps : rawProps.massageDataIn(rawProps);
  let options = props.options;
  useUpdateSelection(props, true);

  if (
    !props.multiple &&
    props.options.length === 2 &&
    allBooleanValues(props.options)
  ) {
    // Only has boolean values
    options = [props.options.find((option) => option.value === "true")]; // This could be a switch, grab 'true' item
  }

  let type = props.multiple ? "checkbox" : "radio";
  let values = props.selection.map((item) => item.value);
  let useSwitch = options.length === 1;

  let onChange = (e) => {
    let value = String(e.target.value);
    let method = "add";
    if (props.multiple || useSwitch)
      method = e.target.checked ? "add" : "remove";

    if (isBooleanSwitch(props) && !e.target.checked) {
      value = options[0].value === "true" ? "false" : "true";
      method = "add";
    }

    // Don't allow unchecking unless it's removable
    if (props.removable || e.target.checked) callOnChange(props, value, method);
  };

  let radioUncheck = (e) => {
    if (
      props.removable &&
      !useSwitch &&
      !props.multiple &&
      props.hasSelection &&
      props.selection[0].value === String(e.target.value)
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
          label={option.label}
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

CheckRadio.defaultProps = {
  ...defaultProps,
  style: {},
  component_CheckBox: CheckBox,
  component_Radio: Radio,
  component_Switch: Switch,
};

export default forwardRef(CheckRadio);
