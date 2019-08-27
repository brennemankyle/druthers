# Demo
https://brennemankyle.github.io/react-new-input/

# Install
`npm install react-new-input`

# Comparison
| Name | Bundle Size |
| - | - |
| react-new-input | gzip 10.7kb (https://bundlephobia.com/result?p=react-new-input) |
| react-select (competitor) | gzip 26.1kb (https://bundlephobia.com/result?p=react-select) |

# Properties
| Name | Default Value | Description |
| - | - | - |
| onChange | undefined | Event when selection changes |
| onBlur | noop | Event when focus is lost |
| onFocus | noop | Event when focus is gained |
| name | undefined | The HTML name in the form |
| selection | [] | The currently selected items |
| options | [] | The options to choose from |
| placeholder | 'Select...' | The placeholder of the search field |
| multiple | false | Whether multiple items can be selected |
| disabled | false | Whether component is disabled |
| creatable | false | Whether new selected items can be created |
| removable | true | Whether selected items are removable |
| appendToBody | false | Whether options append to the body tag (can prevent options from being clipped) |
| rightToLeft | false | Whether to show text from right to left instead |
| allowDuplicates | true | Whether duplicate selection items are allowed |
| filterOptions | filterOptions | The function which filters options based on search text |
| massageDataIn | massageDataIn | The function that massages the props coming in |
| massageDataOut | massageDataOut | The function massaging the selection returned from the onChange event |
| optionKeys | ['value', 'label'] | The name of the keys in an option object |
| checkRadioMaxCount | 10 | The maximum radio buttons allowed before rendering a Select instead |
| **Text Props** |||
| text_placeholder | '' | Same as `placeholder` with a more descriptive name |
| text_noOptions | 'No Options' | The text shown when there are no options |
| text_create | 'Create' | The text shown when a new selection can be created |
| **Component Props** |||
| component_Select | Select | Multi/Single select component |
| component_CheckRadio | CheckRadio | Groups checkbox and radio components |
| component_CheckBox | CheckBox | Checkbox component |
| component_Radio | Radio | Radio button component |
| component_Switch | Switch | On/Off switch component |
| component_HtmlFieldData | HtmlFieldData | Hidden component which keeps current selection in the HTML form |
| component_Wrapper | Wrapper | Wraps the entire select component |
| component_Selection | Selection | Component showing one selected item |
| component_SelectionList | SelectionList | List of selected items |
| component_OptionList | OptionList | List of options |
| component_Option | Option | Component showing one option |
| component_Search | Search | Component responsable for the search text |
| component_SelectionWrapper | SelectionWrapper | Displays everything for the Select except the options |
| component_OptionsWrapper | OptionsWrapper | Wraps the OptionList |
| component_AppendToBodyOptionsWrapper | AppendToBodyOptionsWrapper | Appends the OptionList to body tag |
| component_StyledAppendToBodyOptionsWrapper | StyledAppendToBodyOptionsWrapper | Styleable version of AppendToBodyOptionsWrapper wrapped inside of it |
| **SVG Props** |||
| svg_Checkmark | Checkmark | The checkmark image |
| svg_Remove | Remove | The remove image |
| svg_Expand | Expand | the expand image |
| **Style Props** |||
| styles_fontSize | '1em' | Controls the entire size of the component |
| styles_borderRadius | '.2em' | The amount of curve of the border |
| styles_paddingTop | '.25em' | The padding top |
| styles_paddingBottom | '.25em' | The padding bottom |
| styles_paddingLeft | '.25em' | The padding left |
| styles_paddingRight | '.25em' | The padding right |
| styles_selection_paddingTop | '.2em' | The selection's padding top |
| styles_selection_paddingBottom | '.2em' | The selection's padding bottom |
| styles_selection_paddingLeft | '.4em' | The selection's padding left |
| styles_selection_paddingRight | '.4em' | The selection's padding right |
| styles_selection_margin | '.2em' | The selection's margin |
| styles_option_paddingTop | '.25em' | The option's padding top |
| styles_option_paddingBottom | '.25em' | The option's padding bottom |
| styles_option_paddingLeft | '.25em' | The option's padding left |
| styles_option_paddingRight | '.25em' | The option's padding right |
| styles_checkRadio_borderWidth | '2px' | The border width for checkbox, radio, and switch |
| styles_checkRadio_marginBetween | '1em' | The margin between radios and checkboxes |
| styles_checkRadio_labelMargin | '.2em' | The margin between the label and it's radio/checkbox/switch |
| styles_checkRadio_paddingTop | '.2em' | The padding top for radio/checkbox/switch group |
| styles_checkRadio_paddingBottom | '.2em' | The padding bottom for radio/checkbox/switch group |
| styles_checkRadio_paddingLeft | '.2em' | The padding left for radio/checkbox/switch group |
| styles_checkRadio_paddingRight | '.2em' | The padding right for radio/checkbox/switch group |
| styles_search_width | '10em' | The width of the search component |
| styles_icon_width | '1em' | The width of all icon/SVGs |
| styles_colors_primary | 'black' | The primary color used |
| styles_colors_secondary | '#C3C3C3' | The secondary color used |
| styles_colors_highlight | 'lightblue' | The color of a highlighted option |
| styles_colors_warning | '#FABAAC' | The color of remove selection background |
| styles_colors_warningBold | '#FA2222' | The color of the remove selection icon |
| styles_colors_disabled | '#ECECEC' | The color for disabled elements |
| styles_colors_background | 'white' | The background color used |
