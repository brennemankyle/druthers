import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Select from "./Select";

let options = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
  { value: "3", label: "Pickle" },
  { value: "4", label: "Pick" },
  { value: "5", label: "a Pickle" },
  { value: "6", label: "Pi" },
  { value: "7", label: "a Pie" },
  { value: "8", label: "a Pie is nice" },
  { value: "9", label: "Pie" },
  { value: "10", label: "a Pickle is not Pie" }
];

let State = () => {
  const [selectionMultipleCreate, setSelectionMultipleCreate] = useState([]);

  return (
    <Select
      selection={selectionMultipleCreate}
      onFocus={action("onFocus")}
      onBlur={action("onBlur")}
      onChange={e => setSelectionMultipleCreate(e.target.value)}
      options={options}
      creatable={true}
      multiple={true}
    />
  );
};

storiesOf("Select", module).add("Multi Select Creatable", () => <State />);
