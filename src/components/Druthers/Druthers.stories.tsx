import React, { forwardRef, useRef, useState } from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Druthers from "./Druthers";

let options = [
  { value: "1", label: "Banana" },
  { value: "2", label: "Orange" },
  { value: "3", label: "Grape" },
  { value: "4", label: "GrapeFruit" },
  { value: "5", label: "Apple" },
];

let manyOptions = [
  { value: "1", label: "Banana" },
  { value: "2", label: "Orange" },
  { value: "3", label: "Grape" },
  { value: "4", label: "GrapeFruit" },
  { value: "5", label: "Apple" },
  { value: "6", label: "Pear" },
  { value: "7", label: "Pineapple" },
  { value: "8", label: "Mango" },
  { value: "9", label: "Kiwi" },
  { value: "10", label: "Strawberry" },
  { value: "11", label: "Cherry" },
  { value: "12", label: "Blueberry" },
  { value: "13", label: "Raspberry" },
  { value: "14", label: "Watermelon" },
  { value: "15", label: "Papaya" },
  { value: "16", label: "Raspberry" },
  { value: "17", label: "Tomato" },
  { value: "18", label: "Durian" },
  { value: "19", label: "Apricot" },
  { value: "20", label: "Pomegranate" },
  { value: "21", label: "Crabapple" },
  { value: "22", label: "Dragonfruit" },
  { value: "23", label: "Soursop" },
];

let duplicateOptions = [
  { value: "1", label: "Option 1" },
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
];

let checkRadioOptions = [
  { value: "1", label: "Purple" },
  { value: "2", label: "Green" },
  { value: "3", label: "Blue" },
  { value: "4", label: "Pink" },
];

let displayElementOptions = [
  {
    value: "1",
    label: "Google",
    displayElement: (
      <a target="_blank" href="https://www.google.com/">
        Google
      </a>
    ),
  },
  {
    value: "2",
    label: "Bing",
    displayElement: (
      <a target="_blank" href="https://www.bing.com/">
        Bing
      </a>
    ),
  },
  {
    value: "3",
    label: "DuckDuckGo",
    displayElement: (
      <a target="_blank" href="https://duckduckgo.com/">
        DuckDuckGo
      </a>
    ),
  },
];

let switchOptions = [
  { value: "on", label: "On (some really long label here)" },
];

let trueSwitchOptions = [{ value: true, label: "True" }];

let optionGroupOptions = [
  {
    label: "Colors",
    options: [
      { value: 1, label: "Purple" },
      { value: "2", label: "Green" },
      { value: "3", label: "Blue" },
      { value: 4, label: "Pink" },
    ],
  },
  {
    label: "Fruits",
    options: [
      { value: "5", label: "Banana" },
      { value: "6", label: "Orange" },
      { value: 7, label: "Grape" },
      { value: "8", label: "GrapeFruit" },
      { value: "9", label: "Apple" },
    ],
  },
  { value: "other", label: "Other" },
];

let selectableOptionGroupOptions = [
  {
    value: "everything",
    label: "Everything",
    options: [
      { value: "burger", label: "Burger" },
      { value: "cheese", label: "Cheese" },
      { value: "pickle", label: "Pickle" },
      { value: "lettuce", label: "Lettuce" },
      { value: "tomato", label: "Tomato" },
    ],
  },
  {
    value: "all_condiments",
    label: "Condiments",
    options: [
      { value: "ketchup", label: "Ketchup" },
      { value: "mustard", label: "Mustard" },
      { value: "mayo", label: "Mayo" },
    ],
  },
  { value: "to_go", label: "To Go" },
];

let infiniteOptionGroupOptions = [
  {
    value: "burger",
    label: "Burger",
    options: [
      {
        value: "patty",
        label: "Patty",
        options: [
          { value: "beef", label: "Beef" },
          {
            value: "veggie",
            label: "Veggie",
            options: [
              { value: "blackbean", label: "Black bean" },
              { value: "grain", label: "Grain" },
              { value: "mirepoix", label: "Mirepoix" },
            ],
          },
          { value: "lamb", label: "Lamb" },
        ],
      },
      { value: "cheese", label: "Cheese" },
      { value: "pickle", label: "Pickle" },
      { value: "lettuce", label: "Lettuce" },
      { value: "tomato", label: "Tomato" },
      {
        value: "all_condiments",
        label: "Condiments",
        options: [
          { value: "ketchup", label: "Ketchup" },
          { value: "mustard", label: "Mustard" },
          { value: "mayo", label: "Mayo" },
        ],
      },
    ],
  },
  { value: "to_go", label: "To Go" },
];

const StoryDruthers = forwardRef(function StoryDruthers(props, ref) {
  const [selection, setSelection] = useState(props.selection);
  let { selection: test, onChange, ...otherProps } = props;

  return (
    <Druthers
      {...otherProps}
      ref={ref}
      selection={selection}
      onChange={(e) => {
        setSelection(e.target.value);
        if (Array.isArray(e.target.value)) {
          action("onChange")(...e.target.value);
        } else {
          action("onChange")(e.target.value, "<<<< Single Value");
        }
      }}
      onFocus={() => action("onFocus")}
      onBlur={() => action("onBlur")}
    />
  );
});
StoryDruthers.displayName = "Druthers";

const FocusButton = () => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <>
      <button
        onClick={() => {
          if (ref.current) {
            ref.current.focus();
          }
        }}
      >
        Focus
      </button>
      <StoryDruthers
        name="Focus Select"
        selection={selection}
        options={options}
        ref={ref}
        checkRadioMaxCount={0}
      />
    </>
  );
};

const info = {
  propTables: [Druthers],
  propTablesExclude: [StoryDruthers],
};

let selection = [];

storiesOf("Druthers", module)
  .add(
    "Single",
    () => (
      <StoryDruthers
        name="Single"
        className="single"
        selection={selection}
        options={options}
        checkRadioMaxCount={0}
      />
    ),
    { info }
  )
  .add(
    "Multiple",
    () => (
      <StoryDruthers
        name="Multiple"
        selection={selection}
        options={options}
        multiple
        checkRadioMaxCount={0}
      />
    ),
    { info }
  )
  .add(
    "Create Single",
    () => (
      <StoryDruthers
        name="SingleCreate"
        selection={selection}
        options={options}
        creatable
      />
    ),
    { info }
  )
  .add(
    "Create Multiple",
    () => (
      <StoryDruthers
        name="MultipleCreate"
        selection={selection}
        options={options}
        creatable
        multiple
      />
    ),
    { info }
  )
  .add(
    "Option Groups",
    () => (
      <StoryDruthers
        name="OptionGroups"
        selection={selection}
        options={optionGroupOptions}
      />
    ),
    { info }
  )
  .add(
    "Truncate Options",
    () => (
      <StoryDruthers
        name="TruncateOptions"
        selection={selection}
        options={optionGroupOptions}
        truncateOptions={5}
      />
    ),
    { info }
  )
  .add(
    "Scroll",
    () => (
      <StoryDruthers
        name="Scroll"
        className="Scroll"
        optionsAlwaysOpen
        selection={selection}
        options={manyOptions}
        checkRadioMaxCount={0}
      />
    ),
    { info }
  )
  .add(
    "Selectable Option Groups",
    () => (
      <StoryDruthers
        name="SelectableOptionGroups"
        selection={selection}
        options={selectableOptionGroupOptions}
        multiple
      />
    ),
    { info }
  )
  .add(
    "Infinite Nested Option Groups",
    () => (
      <StoryDruthers
        name="InfiniteOptionGroupOptions"
        selection={selection}
        options={infiniteOptionGroupOptions}
        multiple
      />
    ),
    { info }
  )
  .add(
    "React Element Custom Display",
    () => (
      <StoryDruthers
        name="ReactElementLabels"
        selection={selection}
        options={displayElementOptions}
        checkRadioMaxCount={0}
        optionsAlwaysOpen
        overlayOptions={false}
      />
    ),
    { info }
  )
  .add(
    "Always Open In Place Options",
    () => (
      <StoryDruthers
        name="AlwaysOpenInPlaceOptions"
        className="always-open-options"
        selection={selection}
        options={optionGroupOptions}
        checkRadioMaxCount={0}
        optionsAlwaysOpen={true}
        overlayOptions={false}
      />
    ),
    { info }
  )
  .add(
    "Append to body",
    () => (
      <StoryDruthers
        name="AppendToBody"
        selection={selection}
        options={options}
        creatable
        multiple
        appendToBody
      />
    ),
    { info }
  )
  .add("Focus Select", () => <FocusButton />, { info })
  .add(
    "Right to left",
    () => (
      <StoryDruthers
        name="RightToLeft"
        selection={selection}
        options={options}
        rightToLeft
        checkRadioMaxCount={0}
      />
    ),
    { info }
  )
  .add(
    "Radios",
    () => (
      <StoryDruthers
        name="Radios"
        selection={selection}
        options={checkRadioOptions}
      />
    ),
    {
      info,
      notes:
        "Resize window to see it change from Radios to Select if it runs out of space on one line",
    }
  )
  .add(
    "Checkboxes",
    () => (
      <StoryDruthers
        name="Checkboxes"
        selection={selection}
        options={checkRadioOptions}
        multiple
      />
    ),
    {
      info,
      notes:
        "Resize window to see it change from Checkboxes to Select if it runs out of space on one line",
    }
  )
  .add(
    "Switch",
    () => (
      <StoryDruthers
        name="Switch"
        selection={selection}
        options={switchOptions}
      />
    ),
    {
      info,
      notes:
        "Resize window to see it change from Switch to Select if it runs out of space on one line",
    }
  )
  .add(
    "True/False Switch",
    () => (
      <StoryDruthers
        name="trueSwitch"
        selection={selection}
        options={trueSwitchOptions}
      />
    ),
    {
      info,
      notes:
        "Resize window to see it change from Switch to Select if it runs out of space on one line",
    }
  )
  .add(
    "Single No Options",
    () => (
      <StoryDruthers name="SingleNoOptions" selection={selection} creatable />
    ),
    { info }
  )
  .add(
    "Multiple No Options",
    () => (
      <StoryDruthers
        name="MultipleNoOptions"
        selection={selection}
        creatable
        multiple
      />
    ),
    { info }
  )
  .add(
    "Single Disabled",
    () => (
      <StoryDruthers
        name="SingleDisabled"
        selection={["1"]}
        options={options}
        disabled
        checkRadioMaxCount={0}
      />
    ),
    { info }
  )
  .add(
    "Multiple Disabled",
    () => (
      <StoryDruthers
        name="MultipleDisabled"
        selection={["2", "3"]}
        options={options}
        multiple
        disabled
        checkRadioMaxCount={0}
      />
    ),
    { info }
  )
  .add(
    "Radios Disabled",
    () => (
      <StoryDruthers
        name="RadiosDisabled"
        selection={["1"]}
        options={checkRadioOptions}
        disabled
      />
    ),
    {
      info,
      notes:
        "Resize window to see it change from Radios to Select if it runs out of space on one line",
    }
  )
  .add(
    "Checkboxes Disabled",
    () => (
      <StoryDruthers
        name="CheckboxesDisabled"
        selection={["1", "2"]}
        options={checkRadioOptions}
        multiple
        disabled
      />
    ),
    {
      info,
      notes:
        "Resize window to see it change from Switch to Select if it runs out of space on one line",
    }
  )
  .add(
    "Switch Disabled",
    () => (
      <StoryDruthers
        name="SwitchDisabled"
        selection={["true"]}
        options={switchOptions}
        disabled
      />
    ),
    {
      info,
      notes:
        "Resize window to see it change from Switch to Select if it runs out of space on one line",
    }
  )
  .add(
    "No Duplicates",
    () => (
      <StoryDruthers
        name="NoDuplicates"
        selection={selection}
        options={duplicateOptions}
        creatable
        multiple
        allowDuplicates={false}
      />
    ),
    { info }
  );
