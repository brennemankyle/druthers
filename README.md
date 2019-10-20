# Demo with Storybook
https://brennemankyle.github.io/react-new-input/

# Features
A robust multi-select that automatically uses Radios, Checkboxes, or a Switch if they'll fit on one line
* Deterministic even with dynamic/live prop updates
* Completely customizable: replace any internal component, styling, icon, text, or search filter by changing props
* Automatically uses Radios, Checkboxes, or a Switch if it fits on one line (updates on live screen resizes)
* Search using fuzzy matching: mossisippi > Mississippi, py > Pi. Powered by https://glench.github.io/fuzzyset.js/
* Fully usable with only the Keyboard
* Creatable options (managed by a prop not a separate component)
* Small npm package size
* No Jquery
* Modern browser support: Chrome, Safari, Edge, Firefox, iOS, Android
* And much more!

# Install
`npm install react-new-input`

```javascript
// Example File
import React, { useState } from 'react'
import NewInput from 'react-new-input'

// With React Function/Hooks
let SomeHook = () => {
  const [selection, setSelection] = useState()
  let options = [
    {value: '1', label: 'Option 1'},
    {value: '2', label: 'Option 2'},
  ]

  return <NewInput
    name="example"
    selection={selection}
    onChange={(e) => setSelection(e.target.value)}
    options={options} />
}

// OR With React Component
class SomeComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {selection}
    this.options = [
      {value: '1', label: 'Option 1'},
      {value: '2', label: 'Option 2'},
    ]
  }

  onChange(e) {
    this.setState({
      selection: e.target.value
    })
  }

  render() {
    return <NewInput
      name="example"
      selection={this.state.selection}
      onChange={this.onChange}
      options={this.options} />
  }
}
```

# Comparison
| Name | Bundle Size |
| - | - |
| react-new-input | gzip 21.1kB (https://bundlephobia.com/result?p=react-new-input) |
| react-select (competitor) | gzip 26.1kb (https://bundlephobia.com/result?p=react-select) |

# Property Defaults
| Name | Default Value |
| - | - |
| onChange | undefined |
| onBlur | noop |
| onFocus | noop |
| name | undefined |
| selection | [] |
| options | [] |
| placeholder | 'Select...' |
| multiple | false |
| disabled | false |
| creatable | false |
| removable | true |
| appendToBody | false |
| rightToLeft | false |
| allowDuplicates | true |
| alwaysReturnArray | false |
| filterOptions | filterOptions |
| massageDataIn | massageDataIn |
| massageDataOut | massageDataOut |
| optionKeys | ['value', 'label'] |
| checkRadioMaxCount | 10 |
| **Text Props** ||
| text_placeholder | '' |
| text_noOptions | 'No Options' |
| text_create | 'Create' |
| **Component Props** ||
| component_Select | Select |
| component_CheckRadio | CheckRadio |
| component_CheckBox | CheckBox |
| component_Radio | Radio |
| component_Switch | Switch |
| component_HtmlFieldData | HtmlFieldData |
| component_Wrapper | Wrapper |
| component_Selection | Selection |
| component_SelectionList | SelectionList |
| component_OptionList | OptionList |
| component_Option | Option |
| component_Search | Search |
| component_SelectionWrapper | SelectionWrapper |
| component_OptionsWrapper | OptionsWrapper |
| component_AppendToBodyOptionsWrapper | AppendToBodyOptionsWrapper |
| component_StyledAppendToBodyOptionsWrapper | StyledAppendToBodyOptionsWrapper |
| **SVG Props** ||
| svg_Checkmark | Checkmark |
| svg_Remove | Remove |
| svg_Expand | Expand |
| **Style Props** ||
| styles_fontSize | '1em' |
| styles_borderRadius | '.2em' |
| styles_paddingTop | '.25em' |
| styles_paddingBottom | '.25em' |
| styles_paddingLeft | '.25em' |
| styles_paddingRight | '.25em' |
| styles_selection_paddingTop | '.2em' |
| styles_selection_paddingBottom | '.2em' |
| styles_selection_paddingLeft | '.4em' |
| styles_selection_paddingRight | '.4em' |
| styles_selection_margin | '.2em' |
| styles_option_paddingTop | '.25em' |
| styles_option_paddingBottom | '.25em' |
| styles_option_paddingLeft | '.25em' |
| styles_option_paddingRight | '.25em' |
| styles_checkRadio_borderWidth | '2px' |
| styles_checkRadio_marginBetween | '1em' |
| styles_checkRadio_labelMargin | '.2em' |
| styles_checkRadio_paddingTop | '.2em' |
| styles_checkRadio_paddingBottom | '.2em' |
| styles_checkRadio_paddingLeft | '.2em' |
| styles_checkRadio_paddingRight | '.2em' |
| styles_search_size | 5 |
| styles_icon_width | '1em' |
| styles_colors_primary | 'black' |
| styles_colors_secondary | '#C3C3C3' |
| styles_colors_highlight | 'lightblue' |
| styles_colors_warning | '#FABAAC' |
| styles_colors_warningBold | '#FA2222' |
| styles_colors_disabled | '#ECECEC' |
| styles_colors_background | 'white' |

# Property Descriptions
| Name | Description |
| - | - |
| onChange | Event when selection changes |
| onBlur | Event when focus is lost |
| onFocus | Event when focus is gained |
| name | The HTML name in the form |
| selection | The currently selected items |
| options | The options to choose from |
| placeholder | The placeholder of the search field |
| multiple | Whether multiple items can be selected |
| disabled | Whether component is disabled |
| creatable | Whether new selected items can be created |
| removable | Whether selected items are removable |
| appendToBody | Whether options append to the body tag (can prevent options from being clipped) |
| rightToLeft | Whether to show text from right to left instead |
| allowDuplicates | Whether duplicate selection items are allowed |
| alwaysReturnArray | Always return an array from onChange, instead of only when multiple |
| filterOptions | The function which filters options based on search text |
| massageDataIn | The function that massages the props coming in |
| massageDataOut | The function massaging the selection returned from the onChange event |
| optionKeys | The name of the keys in an option object |
| checkRadioMaxCount | The maximum radio buttons allowed before rendering a Select instead |
| **Text Props** ||
| text_placeholder | Same as `placeholder` with a more descriptive name |
| text_noOptions | The text shown when there are no options |
| text_create | The text shown when a new selection can be created |
| **Component Props** ||
| component_Select | Multi/Single select component |
| component_CheckRadio | Groups checkbox and radio components |
| component_CheckBox | Checkbox component |
| component_Radio | Radio button component |
| component_Switch | On/Off switch component |
| component_HtmlFieldData | Hidden component which keeps current selection in the HTML form |
| component_Wrapper | Wraps the entire select component |
| component_Selection | Component showing one selected item |
| component_SelectionList | List of selected items |
| component_OptionList | List of options |
| component_Option | Component showing one option |
| component_Search | Component responsable for the search text |
| component_SelectionWrapper | Displays everything for the Select except the options |
| component_OptionsWrapper | Wraps the OptionList |
| component_AppendToBodyOptionsWrapper | Appends the OptionList to body tag |
| component_StyledAppendToBodyOptionsWrapper | Styleable version of AppendToBodyOptionsWrapper wrapped inside of it |
| **SVG Props** ||
| svg_Checkmark | The checkmark image |
| svg_Remove | The remove image |
| svg_Expand | the expand image |
| **Style Props** ||
| styles_fontSize | Controls the entire size of the component |
| styles_borderRadius | The amount of curve of the border |
| styles_paddingTop | The padding top |
| styles_paddingBottom | The padding bottom |
| styles_paddingLeft | The padding left |
| styles_paddingRight | The padding right |
| styles_selection_paddingTop | The selection's padding top |
| styles_selection_paddingBottom | The selection's padding bottom |
| styles_selection_paddingLeft | The selection's padding left |
| styles_selection_paddingRight | The selection's padding right |
| styles_selection_margin | The selection's margin |
| styles_option_paddingTop | The option's padding top |
| styles_option_paddingBottom | The option's padding bottom |
| styles_option_paddingLeft | The option's padding left |
| styles_option_paddingRight | The option's padding right |
| styles_checkRadio_borderWidth | The border width for checkbox, radio, and switch |
| styles_checkRadio_marginBetween | The margin between radios and checkboxes |
| styles_checkRadio_labelMargin | The margin between the label and it's radio/checkbox/switch |
| styles_checkRadio_paddingTop | The padding top for radio/checkbox/switch group |
| styles_checkRadio_paddingBottom | The padding bottom for radio/checkbox/switch group |
| styles_checkRadio_paddingLeft | The padding left for radio/checkbox/switch group |
| styles_checkRadio_paddingRight | The padding right for radio/checkbox/switch group |
| styles_search_size | The size of the search component |
| styles_icon_width | The width of all icon/SVGs |
| styles_colors_primary | The primary color used |
| styles_colors_secondary | The secondary color used |
| styles_colors_highlight | The color of a highlighted option |
| styles_colors_warning | The color of remove selection background |
| styles_colors_warningBold | The color of the remove selection icon |
| styles_colors_disabled | The color for disabled elements |
| styles_colors_background | The background color used |
