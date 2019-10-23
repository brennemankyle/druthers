import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { mockStyles } from '../../mocks'
import NewInput from './NewInput'

let options = [
  {value: '1', label: 'Banana'},
  {value: '2', label: 'Orange'},
  {value: '3', label: 'Grape'},
  {value: '4', label: 'GrapeFruit'},
  {value: '5', label: 'Apple'},
]

let duplicateOptions = [
  {value: '1', label: 'Option 1'},
  {value: '1', label: 'Option 1'},
  {value: '2', label: 'Option 2'},
]

let checkRadioOptions = [
  {value: '1', label: 'Purple'},
  {value: '2', label: 'Green'},
  {value: '3', label: 'Blue'},
  {value: '4', label: 'Pink'},
]

let switchOptions = [
  {value: 'on', label: 'On (some really long label here)'},
]

let trueSwitchOptions = [
  {value: true, label: 'True'},
]

let optionGroupOptions = [
  {label: 'Colors', options: [
    {value: 1, label: 'Purple'},
    {value: '2', label: 'Green'},
    {value: '3', label: 'Blue'},
    {value: 4, label: 'Pink'},
  ]},
  {label: 'Fruits', options: [
    {value: '5', label: 'Banana'},
    {value: '6', label: 'Orange'},
    {value: 7, label: 'Grape'},
    {value: '8', label: 'GrapeFruit'},
    {value: '9', label: 'Apple'},
  ]},
]

const StoryNewInput = props => {
  const [selection, setSelection] = useState(props.selection)
  let { selection: test, onChange, ...otherProps } = props

  return <NewInput
    {...otherProps}
    selection={selection}
    onChange={(e) => {
      setSelection(e.target.value)
      if (Array.isArray(e.target.value)) {
        action('onChange')(...e.target.value)
      } else {
        action('onChange')(e.target.value, "<<<< Single Value")
      }
    }}
    onFocus={() => action('onFocus')}
    onBlur={() => action('onBlur')} />
}
StoryNewInput.displayName = 'NewInput'

const info = {
  propTables: [NewInput],
  propTablesExclude: [StoryNewInput],
}
let selection = []
let onChange = () => {}

let NoDuplicatesState = () => {
  const [selectionNoDuplicates, setSelectionNoDuplicates] = useState([])

  return <NewInput name="NoDuplicates" selection={selectionNoDuplicates} onChange={(e) => setSelectionNoDuplicates(e.target.value)} options={duplicateOptions} creatable multiple allowDuplicates={false} />
}

storiesOf('New Input', module)
  .add('Single', () => <StoryNewInput name="Single" selection={selection} onChange={onChange} options={options} checkRadioMaxCount={0} />, {info})
  .add('Multiple', () => <StoryNewInput name="Multiple" selection={selection} onChange={onChange} options={options} multiple checkRadioMaxCount={0} />, {info})
  .add('Create Single', () => <StoryNewInput name="SingleCreate" selection={selection} onChange={onChange} options={options} creatable />, {info})
  .add('Create Multiple', () => <StoryNewInput name="MultipleCreate" selection={selection} onChange={onChange} options={options} creatable multiple />, {info})
  .add('Append to body', () => <StoryNewInput name="AppendToBody" selection={selection} onChange={onChange} options={options} creatable multiple appendToBody />, {info})
  .add('Right to left', () => <StoryNewInput name="RightToLeft" selection={selection} onChange={onChange} options={options} rightToLeft checkRadioMaxCount={0} />, {info})
  .add('Radios', () =>   <StoryNewInput name="Radios" selection={selection} onChange={onChange} options={checkRadioOptions} />, {info, notes: 'Resize window to see it change from Radios to Select if it runs out of space on one line'})
  .add('Checkboxes', () => <StoryNewInput name="Checkboxes" selection={selection} onChange={onChange} options={checkRadioOptions} multiple />, {info, notes: 'Resize window to see it change from Checkboxes to Select if it runs out of space on one line'})
  .add('Switch', () => <StoryNewInput name="Switch" selection={selection} onChange={onChange} options={switchOptions} />, {info, notes: 'Resize window to see it change from Switch to Select if it runs out of space on one line'})
  .add('True/False Switch', () => <StoryNewInput name="trueSwitch" selection={selection} onChange={onChange} options={trueSwitchOptions} />, {info, notes: 'Resize window to see it change from Switch to Select if it runs out of space on one line'})
  .add('Single No Options', () => <StoryNewInput name="SingleNoOptions" selection={selection} onChange={onChange} creatable />, {info})
  .add('Multiple No Options', () => <StoryNewInput name="MultipleNoOptions" selection={selection} onChange={onChange} creatable multiple />, {info})
  .add('Option Groups', () => <StoryNewInput name="OptionGroups" selection={selection} onChange={onChange} options={optionGroupOptions} />, {info})
  .add('Single Disabled', () => <StoryNewInput name="SingleDisabled" selection={['1']} onChange={onChange} options={options} disabled checkRadioMaxCount={0} />, {info})
  .add('Multiple Disabled', () => <StoryNewInput name="MultipleDisabled" selection={['2', '3']} onChange={onChange} options={options} multiple disabled checkRadioMaxCount={0} />, {info})
  .add('Radios Disabled', () => <StoryNewInput name="RadiosDisabled" selection={['1']} onChange={onChange} options={checkRadioOptions} disabled />, {info, notes: 'Resize window to see it change from Radios to Select if it runs out of space on one line'})
  .add('Checkboxes Disabled', () => <StoryNewInput name="CheckboxesDisabled" selection={['1', '2']} onChange={onChange} options={checkRadioOptions} multiple disabled />, {info, notes: 'Resize window to see it change from Switch to Select if it runs out of space on one line'})
  .add('Switch Disabled', () => <StoryNewInput name="SwitchDisabled" selection={['true']} onChange={onChange} options={switchOptions} disabled />, {info, notes: 'Resize window to see it change from Switch to Select if it runs out of space on one line'})
  .add('No Duplicates', () => <StoryNewInput name="NoDuplicates" selection={selection} onChange={onChange} options={duplicateOptions} creatable multiple allowDuplicates={false} />, {info})
