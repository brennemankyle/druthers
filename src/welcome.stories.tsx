import { useState, ChangeEvent } from "react";
import { storiesOf } from "@storybook/react";
import defaultProps from "./utils/defaultProps";
import Druthers from "./components/Druthers/Druthers";

let trueOptions = [{ value: true, label: "True" }];

let parseToOptions = [
  { value: "string", label: "string" },
  { value: "number", label: "number" },
  { value: "int", label: "int" },
  { value: "float", label: "float" },
  { value: "boolean", label: "boolean" },
];

let Config = () => {
  const [name, setName] = useState(defaultProps.name || "defaultName");
  const [options, setOptions] = useState(["Option 1", "Option 2"]);
  const [placeholder, setPlaceholder] = useState(defaultProps.placeholder);
  const [multiple, setMultiple] = useState(defaultProps.multiple);
  const [disabled, setDisabled] = useState(defaultProps.disabled);
  const [creatable, setCreatable] = useState(defaultProps.creatable);
  const [removable, setRemovable] = useState(defaultProps.removable);
  const [appendToBody, setAppendToBody] = useState(defaultProps.appendToBody);
  const [rightToLeft, setRightToLeft] = useState(defaultProps.rightToLeft);
  const [allowDuplicates, setAllowDuplicates] = useState(
    defaultProps.allowDuplicates
  );
  const [alwaysReturnArray, setAlwaysReturnArray] = useState(
    defaultProps.alwaysReturnArray
  );
  const [checkRadioMaxCount, setCheckRadioMaxCount] = useState(
    defaultProps.checkRadioMaxCount
  );
  const [parseTo, setParseTo] = useState(defaultProps.parseTo);
  // Text
  const [text_noOptions, setText_noOptions] = useState(
    defaultProps.text_noOptions
  );
  const [text_create, setText_create] = useState(defaultProps.text_create);
  // Styles
  const [styles_fontSize, setStyles_fontSize] = useState(
    defaultProps.styles_fontSize
  );
  const [styles_borderRadius, setStyles_borderRadius] = useState(
    defaultProps.styles_borderRadius
  );
  const [styles_paddingTop, setStyles_paddingTop] = useState(
    defaultProps.styles_paddingTop
  );
  const [styles_paddingBottom, setStyles_paddingBottom] = useState(
    defaultProps.styles_paddingBottom
  );
  const [styles_paddingLeft, setStyles_paddingLeft] = useState(
    defaultProps.styles_paddingLeft
  );
  const [styles_paddingRight, setStyles_paddingRight] = useState(
    defaultProps.styles_paddingRight
  );
  const [styles_selection_paddingTop, setStyles_selection_paddingTop] =
    useState(defaultProps.styles_selection_paddingTop);
  const [styles_selection_paddingBottom, setStyles_selection_paddingBottom] =
    useState(defaultProps.styles_selection_paddingBottom);
  const [styles_selection_paddingLeft, setStyles_selection_paddingLeft] =
    useState(defaultProps.styles_selection_paddingLeft);
  const [styles_selection_paddingRight, setStyles_selection_paddingRight] =
    useState(defaultProps.styles_selection_paddingRight);
  const [styles_selection_margin, setStyles_selection_margin] = useState(
    defaultProps.styles_selection_margin
  );
  const [styles_option_paddingTop, setStyles_option_paddingTop] = useState(
    defaultProps.styles_option_paddingTop
  );
  const [styles_option_paddingBottom, setStyles_option_paddingBottom] =
    useState(defaultProps.styles_option_paddingBottom);
  const [styles_option_paddingLeft, setStyles_option_paddingLeft] = useState(
    defaultProps.styles_option_paddingLeft
  );
  const [styles_option_paddingRight, setStyles_option_paddingRight] = useState(
    defaultProps.styles_option_paddingRight
  );
  const [styles_checkRadio_borderWidth, setStyles_checkRadio_borderWidth] =
    useState(defaultProps.styles_checkRadio_borderWidth);
  const [styles_checkRadio_marginBetween, setStyles_checkRadio_marginBetween] =
    useState(defaultProps.styles_checkRadio_marginBetween);
  const [styles_checkRadio_labelMargin, setStyles_checkRadio_labelMargin] =
    useState(defaultProps.styles_checkRadio_labelMargin);
  const [styles_checkRadio_paddingTop, setStyles_checkRadio_paddingTop] =
    useState(defaultProps.styles_checkRadio_paddingTop);
  const [styles_checkRadio_paddingBottom, setStyles_checkRadio_paddingBottom] =
    useState(defaultProps.styles_checkRadio_paddingBottom);
  const [styles_checkRadio_paddingLeft, setStyles_checkRadio_paddingLeft] =
    useState(defaultProps.styles_checkRadio_paddingLeft);
  const [styles_checkRadio_paddingRight, setStyles_checkRadio_paddingRight] =
    useState(defaultProps.styles_checkRadio_paddingRight);
  const [styles_search_size, setStyles_search_size] = useState(
    defaultProps.styles_search_size
  );
  const [styles_icon_width, setStyles_icon_width] = useState(
    defaultProps.styles_icon_width
  );
  const [styles_colors_primary, setStyles_colors_primary] = useState(
    defaultProps.styles_colors_primary
  );
  const [styles_colors_secondary, setStyles_colors_secondary] = useState(
    defaultProps.styles_colors_secondary
  );
  const [styles_colors_highlight, setStyles_colors_highlight] = useState(
    defaultProps.styles_colors_highlight
  );
  const [styles_colors_warning, setStyles_colors_warning] = useState(
    defaultProps.styles_colors_warning
  );
  const [styles_colors_warningBold, setStyles_colors_warningBold] = useState(
    defaultProps.styles_colors_warningBold
  );
  const [styles_colors_disabled, setStyles_colors_disabled] = useState(
    defaultProps.styles_colors_disabled
  );
  const [styles_colors_background, setStyles_colors_background] = useState(
    defaultProps.styles_colors_background
  );
  const [selectionMultipleCreate, setSelectionMultipleCreate] = useState<
    string[]
  >([]);

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div
        style={{
          width: "45%",
          flexShrink: 0,
          flexGrow: 0,
          height: "98vh",
          overflowY: "auto",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Props (Configure)</h1>
        <label>
          <b>name</b>
          <span style={{ color: "gray" }}> (The HTML name in the form)</span>
          <Druthers
            name="name"
            selection={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            creatable={true}
          />
        </label>
        <label>
          <b>options</b>
          <span style={{ color: "gray" }}> (The options to choose from)</span>
          <Druthers
            name="options"
            selection={options}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setOptions(e.target.value as unknown as string[])
            }
            creatable={true}
            multiple={true}
          />
        </label>
        <label>
          <b>placeholder</b>
          <span style={{ color: "gray" }}>
            {" "}
            (The placeholder of the search field)
          </span>
          <Druthers
            name="placeholder"
            selection={placeholder}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPlaceholder(e.target.value)
            }
            creatable={true}
          />
        </label>
        <label>
          <b>multiple</b>
          <span style={{ color: "gray" }}>
            {" "}
            (Whether multiple items can be selected)
          </span>
          <Druthers
            name="multiple"
            selection={multiple}
            options={trueOptions}
            parseTo="boolean"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setMultiple(e.target.value)
            }
          />
        </label>
        <label>
          <b>disabled</b>
          <span style={{ color: "gray" }}>
            {" "}
            (Whether component is disabled)
          </span>
          <Druthers
            name="disabled"
            selection={disabled}
            options={trueOptions}
            parseTo="boolean"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setDisabled(e.target.value)
            }
          />
        </label>
        <label>
          <b>creatable</b>
          <span style={{ color: "gray" }}>
            {" "}
            (Whether new selected items can be created)
          </span>
          <Druthers
            name="creatable"
            selection={creatable}
            options={trueOptions}
            parseTo="boolean"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCreatable(e.target.value)
            }
          />
        </label>
        <label>
          <b>removable</b>
          <span style={{ color: "gray" }}>
            {" "}
            (Whether selected items are removable)
          </span>
          <Druthers
            name="removable"
            selection={removable}
            options={trueOptions}
            parseTo="boolean"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setRemovable(e.target.value)
            }
          />
        </label>
        <label>
          <b>appendToBody</b>
          <span style={{ color: "gray" }}>
            {" "}
            (Whether options append to the body tag (can prevent options from
            being clipped))
          </span>
          <Druthers
            name="appendToBody"
            selection={appendToBody}
            options={trueOptions}
            parseTo="boolean"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setAppendToBody(e.target.value)
            }
          />
        </label>
        <label>
          <b>rightToLeft</b>
          <span style={{ color: "gray" }}>
            {" "}
            (Whether to show text from right to left instead)
          </span>
          <Druthers
            name="rightToLeft"
            selection={rightToLeft}
            options={trueOptions}
            parseTo="boolean"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setRightToLeft(e.target.value)
            }
          />
        </label>
        <label>
          <b>allowDuplicates</b>
          <span style={{ color: "gray" }}>
            {" "}
            (Whether duplicate selection items are allowed)
          </span>
          <Druthers
            name="allowDuplicates"
            selection={allowDuplicates}
            options={trueOptions}
            parseTo="boolean"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setAllowDuplicates(e.target.value)
            }
          />
        </label>
        <label>
          <b>alwaysReturnArray</b>
          <span style={{ color: "gray" }}>
            {" "}
            (Always return an array from onChange, instead of only when
            multiple)
          </span>
          <Druthers
            name="alwaysReturnArray"
            selection={alwaysReturnArray}
            options={trueOptions}
            parseTo="boolean"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setAlwaysReturnArray(e.target.value)
            }
          />
        </label>
        <label>
          <b>checkRadioMaxCount</b>
          <span style={{ color: "gray" }}>
            {" "}
            (The maximum radio buttons allowed before rendering a Select
            instead)
          </span>
          <Druthers
            name="checkRadioMaxCount"
            selection={checkRadioMaxCount}
            parseTo="int"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCheckRadioMaxCount(e.target.value)
            }
            creatable={true}
          />
        </label>
        <label>
          <b>parseTo</b>
          <span style={{ color: "gray" }}>
            {" "}
            (parse value from onChange to a js type: string, number, boolean, or
            date)
          </span>
          <Druthers
            name="parseTo"
            selection={parseTo}
            options={parseToOptions}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setParseTo(e.target.value)
            }
          />
        </label>
        <label>
          <b>text_noOptions</b>
          <span style={{ color: "gray" }}>
            {" "}
            (The text shown when there are no options)
          </span>
          <Druthers
            name="text_noOptions"
            selection={text_noOptions}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setText_noOptions(e.target.value)
            }
            creatable={true}
          />
        </label>
        <label>
          <b>text_create</b>
          <span style={{ color: "gray" }}>
            {" "}
            (The text shown when a new selection can be created)
          </span>
          <Druthers
            name="text_create"
            selection={text_create}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setText_create(e.target.value)
            }
            creatable={true}
          />
        </label>
        <h3 style={{ textAlign: "center" }}>Styles</h3>
        <label>
          <b>styles_fontSize</b>
          <span style={{ color: "gray" }}>
            {" "}
            (Controls the entire size of the component)
          </span>
          <Druthers
            name="styles_fontSize"
            selection={styles_fontSize}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setStyles_fontSize(e.target.value)
            }
            creatable={true}
          />
        </label>
        <label>
          <b>styles_borderRadius</b>
          <span style={{ color: "gray" }}>
            {" "}
            (The amount of curve of the border)
          </span>
          <Druthers
            name="styles_borderRadius"
            selection={styles_borderRadius}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setStyles_borderRadius(e.target.value)
            }
            creatable={true}
          />
        </label>
        <label>
          <b>styles_paddingTop</b>
          <span style={{ color: "gray" }}> (The padding top)</span>
          <Druthers
            name="styles_paddingTop"
            selection={styles_paddingTop}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setStyles_paddingTop(e.target.value)
            }
            creatable={true}
          />
        </label>
        <label>
          <b>styles_paddingBottom</b>
          <span style={{ color: "gray" }}> (The padding bottom)</span>
          <Druthers
            name="styles_paddingBottom"
            selection={styles_paddingBottom}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setStyles_paddingBottom(e.target.value)
            }
            creatable={true}
          />
        </label>
        <label>
          <b>styles_paddingLeft</b>
          <span style={{ color: "gray" }}> (The padding left)</span>
          <Druthers
            name="styles_paddingLeft"
            selection={styles_paddingLeft}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setStyles_paddingLeft(e.target.value)
            }
            creatable={true}
          />
        </label>
        <label>
          <b>styles_paddingRight</b>
          <span style={{ color: "gray" }}> (The padding right)</span>
          <Druthers
            name="styles_paddingRight"
            selection={styles_paddingRight}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setStyles_paddingRight(e.target.value)
            }
            creatable={true}
          />
        </label>
        <label>
          <b>styles_selection_paddingTop</b>
          <span style={{ color: "gray" }}> (The selection's padding top)</span>
          <Druthers
            name="styles_selection_paddingTop"
            selection={styles_selection_paddingTop}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setStyles_selection_paddingTop(e.target.value)
            }
            creatable={true}
          />
        </label>
        <label>
          <b>styles_selection_paddingBottom</b>
          <span style={{ color: "gray" }}>
            {" "}
            (The selection's padding bottom)
          </span>
          <Druthers
            name="styles_selection_paddingBottom"
            selection={styles_selection_paddingBottom}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setStyles_selection_paddingBottom(e.target.value)
            }
            creatable={true}
          />
        </label>
        <label>
          <b>styles_selection_paddingLeft</b>
          <span style={{ color: "gray" }}> (The selection's padding left)</span>
          <Druthers
            name="styles_selection_paddingLeft"
            selection={styles_selection_paddingLeft}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setStyles_selection_paddingLeft(e.target.value)
            }
            creatable={true}
          />
        </label>
        <label>
          <b>styles_selection_paddingRight</b>
          <span style={{ color: "gray" }}>
            {" "}
            (The selection's padding right)
          </span>
          <Druthers
            name="styles_selection_paddingRight"
            selection={styles_selection_paddingRight}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setStyles_selection_paddingRight(e.target.value)
            }
            creatable={true}
          />
        </label>
        <label>
          <b>styles_selection_margin</b>
          <span style={{ color: "gray" }}> (The selection's margin)</span>
          <Druthers
            name="styles_selection_margin"
            selection={styles_selection_margin}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setStyles_selection_margin(e.target.value)
            }
            creatable={true}
          />
        </label>
        <label>
          <b>styles_option_paddingTop</b>
          <span style={{ color: "gray" }}> (The option's padding top)</span>
          <Druthers
            name="styles_option_paddingTop"
            selection={styles_option_paddingTop}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setStyles_option_paddingTop(e.target.value)
            }
            creatable={true}
          />
        </label>
        <label>
          <b>styles_option_paddingBottom</b>
          <span style={{ color: "gray" }}> (The option's padding bottom)</span>
          <Druthers
            name="styles_option_paddingBottom"
            selection={styles_option_paddingBottom}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setStyles_option_paddingBottom(e.target.value)
            }
            creatable={true}
          />
        </label>
        <label>
          <b>styles_option_paddingLeft</b>
          <span style={{ color: "gray" }}> (The option's padding left)</span>
          <Druthers
            name="styles_option_paddingLeft"
            selection={styles_option_paddingLeft}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setStyles_option_paddingLeft(e.target.value)
            }
            creatable={true}
          />
        </label>
        <label>
          <b>styles_option_paddingRight</b>
          <span style={{ color: "gray" }}> (The option's padding right)</span>
          <Druthers
            name="styles_option_paddingRight"
            selection={styles_option_paddingRight}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setStyles_option_paddingRight(e.target.value)
            }
            creatable={true}
          />
        </label>
        <label>
          <b>styles_checkRadio_borderWidth</b>
          <span style={{ color: "gray" }}>
            {" "}
            (The border width for checkbox, radio, and switch)
          </span>
          <Druthers
            name="styles_checkRadio_borderWidth"
            selection={styles_checkRadio_borderWidth}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setStyles_checkRadio_borderWidth(e.target.value)
            }
            creatable={true}
          />
        </label>
        <label>
          <b>styles_checkRadio_marginBetween</b>
          <span style={{ color: "gray" }}>
            {" "}
            (The margin between radios and checkboxes)
          </span>
          <Druthers
            name="styles_checkRadio_marginBetween"
            selection={styles_checkRadio_marginBetween}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setStyles_checkRadio_marginBetween(e.target.value)
            }
            creatable={true}
          />
        </label>
        <label>
          <b>styles_checkRadio_labelMargin</b>
          <span style={{ color: "gray" }}>
            {" "}
            (The margin between the label and it's radio/checkbox/switch)
          </span>
          <Druthers
            name="styles_checkRadio_labelMargin"
            selection={styles_checkRadio_labelMargin}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setStyles_checkRadio_labelMargin(e.target.value)
            }
            creatable={true}
          />
        </label>
        <label>
          <b>styles_checkRadio_paddingTop</b>
          <span style={{ color: "gray" }}>
            {" "}
            (The padding top for radio/checkbox/switch group)
          </span>
          <Druthers
            name="styles_checkRadio_paddingTop"
            selection={styles_checkRadio_paddingTop}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setStyles_checkRadio_paddingTop(e.target.value)
            }
            creatable={true}
          />
        </label>
        <label>
          <b>styles_checkRadio_paddingBottom</b>
          <span style={{ color: "gray" }}>
            {" "}
            (The padding bottom for radio/checkbox/switch group)
          </span>
          <Druthers
            name="styles_checkRadio_paddingBottom"
            selection={styles_checkRadio_paddingBottom}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setStyles_checkRadio_paddingBottom(e.target.value)
            }
            creatable={true}
          />
        </label>
        <label>
          <b>styles_checkRadio_paddingLeft</b>
          <span style={{ color: "gray" }}>
            {" "}
            (The padding left for radio/checkbox/switch group)
          </span>
          <Druthers
            name="styles_checkRadio_paddingLeft"
            selection={styles_checkRadio_paddingLeft}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setStyles_checkRadio_paddingLeft(e.target.value)
            }
            creatable={true}
          />
        </label>
        <label>
          <b>styles_checkRadio_paddingRight</b>
          <span style={{ color: "gray" }}>
            {" "}
            (The padding right for radio/checkbox/switch group)
          </span>
          <Druthers
            name="styles_checkRadio_paddingRight"
            selection={styles_checkRadio_paddingRight}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setStyles_checkRadio_paddingRight(e.target.value)
            }
            creatable={true}
          />
        </label>
        <label>
          <b>styles_search_size</b>
          <span style={{ color: "gray" }}>
            {" "}
            (The size of the search component)
          </span>
          <Druthers
            name="styles_search_size"
            selection={styles_search_size}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setStyles_search_size(e.target.value)
            }
            creatable={true}
          />
        </label>
        <label>
          <b>styles_icon_width</b>
          <span style={{ color: "gray" }}> (The width of all icon/SVGs)</span>
          <Druthers
            name="styles_icon_width"
            selection={styles_icon_width}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setStyles_icon_width(e.target.value)
            }
            creatable={true}
          />
        </label>
        <label>
          <b>styles_colors_primary</b>
          <span style={{ color: "gray" }}> (The primary color used)</span>
          <Druthers
            name="styles_colors_primary"
            selection={styles_colors_primary}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setStyles_colors_primary(e.target.value)
            }
            creatable={true}
          />
        </label>
        <label>
          <b>styles_colors_secondary</b>
          <span style={{ color: "gray" }}> (The secondary color used)</span>
          <Druthers
            name="styles_colors_secondary"
            selection={styles_colors_secondary}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setStyles_colors_secondary(e.target.value)
            }
            creatable={true}
          />
        </label>
        <label>
          <b>styles_colors_highlight</b>
          <span style={{ color: "gray" }}>
            {" "}
            (The color of a highlighted option)
          </span>
          <Druthers
            name="styles_colors_highlight"
            selection={styles_colors_highlight}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setStyles_colors_highlight(e.target.value)
            }
            creatable={true}
          />
        </label>
        <label>
          <b>styles_colors_warning</b>
          <span style={{ color: "gray" }}>
            {" "}
            (The color of remove selection background)
          </span>
          <Druthers
            name="styles_colors_warning"
            selection={styles_colors_warning}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setStyles_colors_warning(e.target.value)
            }
            creatable={true}
          />
        </label>
        <label>
          <b>styles_colors_warningBold</b>
          <span style={{ color: "gray" }}>
            {" "}
            (The color of the remove selection icon)
          </span>
          <Druthers
            name="styles_colors_warningBold"
            selection={styles_colors_warningBold}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setStyles_colors_warningBold(e.target.value)
            }
            creatable={true}
          />
        </label>
        <label>
          <b>styles_colors_disabled</b>
          <span style={{ color: "gray" }}>
            {" "}
            (The color for disabled elements)
          </span>
          <Druthers
            name="styles_colors_disabled"
            selection={styles_colors_disabled}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setStyles_colors_disabled(e.target.value)
            }
            creatable={true}
          />
        </label>
        <label>
          <b>styles_colors_background</b>
          <span style={{ color: "gray" }}> (The background color used)</span>
          <Druthers
            name="styles_colors_background"
            selection={styles_colors_background}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setStyles_colors_background(e.target.value)
            }
            creatable={true}
          />
        </label>
      </div>
      <div style={{ width: "45%", flexShrink: 0, flexGrow: 0 }}>
        <h1>Demo</h1>
        <Druthers
          selection={selectionMultipleCreate}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSelectionMultipleCreate(e.target.value as unknown as string[])
          }
          name={name}
          options={options.map((option) => ({ value: option, label: option }))}
          placeholder={placeholder}
          multiple={multiple}
          disabled={disabled}
          creatable={creatable}
          removable={removable}
          appendToBody={appendToBody}
          rightToLeft={rightToLeft}
          allowDuplicates={allowDuplicates}
          alwaysReturnArray={alwaysReturnArray}
          checkRadioMaxCount={checkRadioMaxCount}
          parseTo={parseTo}
          text_noOptions={text_noOptions}
          text_create={text_create}
          styles_fontSize={styles_fontSize}
          styles_borderRadius={styles_borderRadius}
          styles_paddingTop={styles_paddingTop}
          styles_paddingBottom={styles_paddingBottom}
          styles_paddingLeft={styles_paddingLeft}
          styles_paddingRight={styles_paddingRight}
          styles_selection_paddingTop={styles_selection_paddingTop}
          styles_selection_paddingBottom={styles_selection_paddingBottom}
          styles_selection_paddingLeft={styles_selection_paddingLeft}
          styles_selection_paddingRight={styles_selection_paddingRight}
          styles_selection_margin={styles_selection_margin}
          styles_option_paddingTop={styles_option_paddingTop}
          styles_option_paddingBottom={styles_option_paddingBottom}
          styles_option_paddingLeft={styles_option_paddingLeft}
          styles_option_paddingRight={styles_option_paddingRight}
          styles_checkRadio_borderWidth={styles_checkRadio_borderWidth}
          styles_checkRadio_marginBetween={styles_checkRadio_marginBetween}
          styles_checkRadio_labelMargin={styles_checkRadio_labelMargin}
          styles_checkRadio_paddingTop={styles_checkRadio_paddingTop}
          styles_checkRadio_paddingBottom={styles_checkRadio_paddingBottom}
          styles_checkRadio_paddingLeft={styles_checkRadio_paddingLeft}
          styles_checkRadio_paddingRight={styles_checkRadio_paddingRight}
          styles_search_size={styles_search_size}
          styles_icon_width={styles_icon_width}
          styles_colors_primary={styles_colors_primary}
          styles_colors_secondary={styles_colors_secondary}
          styles_colors_highlight={styles_colors_highlight}
          styles_colors_warning={styles_colors_warning}
          styles_colors_warningBold={styles_colors_warningBold}
          styles_colors_disabled={styles_colors_disabled}
          styles_colors_background={styles_colors_background}
        />
      </div>
    </div>
  );
};

storiesOf("Welcome", module)
  .add("Features", () => (
    <div>
      <h1>Druthers</h1>
      <b>
        A robust multi-select that automatically uses Radios, Checkboxes, or a
        Switch if they fit on one line
      </b>
      <h3>Features:</h3>
      <ul>
        <li>Deterministic even with dynamic/live prop updates</li>
        <li>
          Completely customizable: replace any internal component, styling,
          icon, text, or search filter by changing props
        </li>
        <li>
          Automatically uses Radios, Checkboxes, or a Switch if it fits on one
          line (updates on live screen resizes)
        </li>
        <li>
          Search using fuzzy matching: mossisippi &gt; Mississippi, py &gt; Pi.
          Powered by https://glench.github.io/fuzzyset.js/
        </li>
        <li>Fully usable with only the Keyboard</li>
        <li>Creatable options (managed by a prop not a separate component)</li>
        <li>Infinite nestable Option Groups and parents are seletable</li>
        <li>Small npm package size</li>
        <li>No Jquery</li>
        <li>
          Modern browser support: Chrome, Safari, Edge, IE11, Firefox, iOS,
          Android
        </li>
        <li>And much more!</li>
      </ul>
    </div>
  ))
  .add("Demo", () => <Config />);
