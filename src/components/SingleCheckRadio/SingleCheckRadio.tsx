import React, { ReactElement, useState, MouseEventHandler } from "react";
import { noop } from "../../utils/utils";
import { MassagedSelectProps } from "../../utils/SelectTypes";

interface Props {
  checked: boolean;
  toggle: boolean;
  value: string;
  onClick: MouseEventHandler<HTMLInputElement>;
  className: string;
  type: string;
  label: ReactElement | string;
  title: string;
}

type CheckRadioProps = Partial<Props> & MassagedSelectProps;

function SingleCheckRadio({
  onClick = noop,
  multiple = false,
  label: baseLabel = "",
  title = "",
  toggle,
  type: baseType,
  className: baseClassName,
  svg_Checkmark,
  value,
  name,
  onChange,
  disabled,
  checked,
}: CheckRadioProps): ReactElement {
  let [hasFocus, setHasFocus] = useState(false);

  let onFocus = () => setHasFocus(true);
  let onBlur = () => setHasFocus(false);
  let type = toggle
    ? "checkbox"
    : baseType || (multiple ? "checkbox" : "radio");
  let label = baseLabel || title;
  let className = baseClassName + " " + (hasFocus ? "focus" : ""); // Allow styling based on .focus
  let Checkmark = svg_Checkmark;

  return (
    <label className={className} key={value}>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onClick={onClick}
        disabled={disabled}
        onFocus={onFocus}
        onBlur={onBlur}
        checked={checked}
      />
      <div className="check-radio-display">
        <Checkmark />
      </div>
      {label}
    </label>
  );
}

export default SingleCheckRadio;
