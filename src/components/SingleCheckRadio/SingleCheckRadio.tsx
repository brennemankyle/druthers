import React, {
  ReactElement,
  useState,
  ChangeEventHandler,
  MouseEventHandler,
} from "react";
import { noop } from "../../utils/utils";

interface Props {
  name: string;
  checked: boolean;
  disabled: boolean;
  toggle: boolean;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onClick: MouseEventHandler<HTMLInputElement>;
  multiple: boolean;
  className: string;
  type: string;
  label: string;
  title: string;
  svg_Checkmark: ReactElement;
}

function SingleCheckRadio(props: Props): ReactElement {
  let [hasFocus, setHasFocus] = useState(false);

  let onFocus = () => setHasFocus(true);
  let onBlur = () => setHasFocus(false);
  let type = props.toggle
    ? "checkbox"
    : props.type || (props.multiple ? "checkbox" : "radio");
  let label = props.label || props.title;
  let className = props.className + " " + (hasFocus ? "focus" : ""); // Allow styling based on .focus
  let Checkmark = props.svg_Checkmark;

  return (
    <label className={className} key={props.value}>
      <input
        type={type}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        onClick={props.onClick}
        disabled={props.disabled}
        onFocus={onFocus}
        onBlur={onBlur}
        checked={props.checked}
      />
      <div className="check-radio-display">
        <Checkmark />
      </div>
      {label}
    </label>
  );
}

SingleCheckRadio.defaultProps = {
  onClick: noop,
  multiple: false,
  label: "",
  title: "",
};

export default SingleCheckRadio;
