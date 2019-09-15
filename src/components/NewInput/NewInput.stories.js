import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { mockStyles } from '../../mocks'
import NewInput from './NewInput'

let options = [
  {value: 'Alabama', label: 'Alabama'},
  {value: 'Alaska', label: 'Alaska'},
  {value: 'Arizona', label: 'Arizona'},
  {value: 'Arkansas', label: 'Arkansas'},
  {value: 'California', label: 'California'},
  {value: 'Colorado', label: 'Colorado'},
  {value: 'Connecticut', label: 'Connecticut'},
  {value: 'Delaware', label: 'Delaware'},
  {value: 'Florida', label: 'Florida'},
  {value: 'Georgia', label: 'Georgia'},
  {value: 'Hawaii', label: 'Hawaii'},
  {value: 'Idaho', label: 'Idaho'},
  {value: 'Illinois', label: 'Illinois'},
  {value: 'Indiana', label: 'Indiana'},
  {value: 'Iowa', label: 'Iowa'},
  {value: 'Kansas', label: 'Kansas'},
  {value: 'Kentucky', label: 'Kentucky'},
  {value: 'Louisiana', label: 'Louisiana'},
  {value: 'Maine', label: 'Maine'},
  {value: 'Maryland', label: 'Maryland'},
  {value: 'Massachusetts', label: 'Massachusetts'},
  {value: 'Michigan', label: 'Michigan'},
  {value: 'Minnesota', label: 'Minnesota'},
  {value: 'Mississippi', label: 'Mississippi'},
  {value: 'Missouri', label: 'Missouri'},
  {value: 'Montana', label: 'Montana'},
  {value: 'Nebraska', label: 'Nebraska'},
  {value: 'Nevada', label: 'Nevada'},
  {value: 'New Hampshire', label: 'New Hampshire'},
  {value: 'New Jersey', label: 'New Jersey'},
  {value: 'New Mexico', label: 'New Mexico'},
  {value: 'New York', label: 'New York'},
  {value: 'North Carolina', label: 'North Carolina'},
  {value: 'North Dakota', label: 'North Dakota'},
  {value: 'Ohio', label: 'Ohio'},
  {value: 'Oklahoma', label: 'Oklahoma'},
  {value: 'Oregon', label: 'Oregon'},
  {value: 'Pennsylvania', label: 'Pennsylvania'},
  {value: 'Rhode Island', label: 'Rhode Island'},
  {value: 'South Carolina', label: 'South Carolina'},
  {value: 'South Dakota', label: 'South Dakota'},
  {value: 'Tennessee', label: 'Tennessee'},
  {value: 'Texas', label: 'Texas'},
  {value: 'Utah', label: 'Utah'},
  {value: 'Vermont', label: 'Vermont'},
  {value: 'Virginia', label: 'Virginia'},
  {value: 'Washington', label: 'Washington'},
  {value: 'West Virginia', label: 'West Virginia'},
  {value: 'Wisconsin', label: 'Wisconsin'},
  {value: 'Wyoming', label: 'Wyoming'},
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
  {value: '5', label: 'All The Colors in The Rainbow'},
]

let switchOptions = [
  {value: true, label: 'On (some really long label here)'},
  {value: false, label: 'Off'},
]

let SingleState = () => {
  const [selectionSingle, setSelectionSingle] = useState()

  return <NewInput name="Single" selection={selectionSingle} onChange={(e) => setSelectionSingle(e.target.value)} options={options} />
}

let MultipleState = () => {
  const [selectionMultiple, setSelectionMultiple] = useState([])

  return <NewInput name="Multiple" selection={selectionMultiple} onChange={(e) => setSelectionMultiple(e.target.value)} options={options} multiple={true} />
}

let SingleCreateState = () => {
  const [selectionSingleCreate, setSelectionSingleCreate] = useState('Alabama')

  return <NewInput name="SingleCreate" selection={selectionSingleCreate} onChange={(e) => setSelectionSingleCreate(e.target.value)} options={options} creatable={true} />
}

let MultipleCreateState = () => {
  const [selectionMultipleCreate, setSelectionMultipleCreate] = useState('Alabama')

  return <NewInput name="MultipleCreate" selection={selectionMultipleCreate} onChange={(e) => setSelectionMultipleCreate(e.target.value)} options={options} creatable={true} multiple={true} />
}

let AppendToBodyState = () => {
  const [selectionAppendToBody, setSelectionAppendToBody] = useState(['Alabama'])

  return <NewInput name="AppendToBody" selection={selectionAppendToBody} onChange={(e) => setSelectionAppendToBody(e.target.value)} options={options} creatable={true} multiple={true} appendToBody={true} />
}

let RightToLeftState = () => {
  const [selectionRightToLeft, setSelectionRightToLeft] = useState()

  return <NewInput name="RightToLeft" selection={selectionRightToLeft} onChange={(e) => setSelectionRightToLeft(e.target.value)} options={options} rightToLeft={true} />
}

let RadiosState = () => {
  const [selectionRadio, setSelectionRadio] = useState()

  return [
    <h3 key="description">Resize window to see it change from Radios to Select if it runs out of space on one line</h3>,
    <NewInput key="NewInput" name="Radios" selection={selectionRadio} onChange={(e) => setSelectionRadio(e.target.value)} options={checkRadioOptions} />
  ]
}

let CheckboxesState = () => {
  const [selectionCheck, setSelectionCheck] = useState()

  return [
    <h3 key="description">Resize window to see it change from Checkboxes to Select if it runs out of space on one line</h3>,
    <NewInput key="NewInput" name="Checkboxes" selection={selectionCheck} onChange={(e) => setSelectionCheck(e.target.value)} options={checkRadioOptions} multiple={true} />
  ]
}

let SwitchState = () => {
  const [selectionSwitch, setSelectionSwitch] = useState()

  return [
    <h3 key="description">Resize window to see it change from Switch to Select if it runs out of space on one line</h3>,
    <NewInput key="NewInput" name="Switch" selection={selectionSwitch} onChange={(e) => setSelectionSwitch(e.target.value)} options={switchOptions} />
  ]
}

let SingleNoOptionsState = () => {
  const [selectionSingleNoOptions, setSelectionSingleNoOptions] = useState()

  return <NewInput name="SingleNoOptions" selection={selectionSingleNoOptions} onChange={(e) => setSelectionSingleNoOptions(e.target.value)} creatable={true} />
}

let SingleDisabledState = () => {
  return <NewInput name="SingleDisabled" selection={['Alabama']} onChange={(e) => setSelectionSingle(e.target.value)} options={options} disabled={true} />
}

let MultipleDisabledState = () => {
  return <NewInput name="MultipleDisabled" selection={['Alabama', 'Colorado']} onChange={(e) => setSelectionMultiple(e.target.value)} options={options} multiple={true} disabled={true} />
}

let RadiosDisabledState = () => {
  return [
    <h3 key="description">Resize window to see it change from Radios to Select if it runs out of space on one line</h3>,
    <NewInput key="NewInput" name="RadiosDisabled" selection={['1']} onChange={(e) => setSelectionRadio(e.target.value)} options={checkRadioOptions} disabled={true} />
  ]
}

let CheckboxesDisabledState = () => {
  return [
    <h3 key="description">Resize window to see it change from Checkboxes to Select if it runs out of space on one line</h3>,
    <NewInput key="NewInput" name="CheckboxesDisabled" selection={['1', '2']} onChange={(e) => setSelectionCheck(e.target.value)} options={checkRadioOptions} multiple={true} disabled={true} />
  ]
}

let SwitchDisabledState = () => {
  return [
    <h3 key="description">Resize window to see it change from Switch to Select if it runs out of space on one line</h3>,
    <NewInput key="NewInput" name="SwitchDisabled" selection={['true']} onChange={(e) => setSelectionSwitch(e.target.value)} options={switchOptions} disabled={true} />
  ]
}

let NoDuplicatesState = () => {
  const [selectionNoDuplicates, setSelectionNoDuplicates] = useState([])

  return <NewInput name="NoDuplicates" selection={selectionNoDuplicates} onChange={(e) => setSelectionNoDuplicates(e.target.value)} options={duplicateOptions} creatable={true} multiple={true} allowDuplicates={false} />
}

let NoOptionsState = () => {
  const [selectionNoOptions, setSelectionNoOptions] = useState([])

  return <NewInput name="NoOptions" selection={selectionNoOptions} onChange={(e) => setSelectionNoOptions(e.target.value)} creatable={true} multiple={true} />
}

storiesOf('New Input', module)
  .add('Single', () => <SingleState />)
  .add('Multiple', () => <MultipleState />)
  .add('Create Single', () => <SingleCreateState />)
  .add('Create Multiple', () => <MultipleCreateState />)
  .add('Append to body', () => <AppendToBodyState />)
  .add('Right to left', () => <RightToLeftState />)
  .add('Radios', () => <RadiosState />)
  .add('Checkboxes', () => <CheckboxesState />)
  .add('Switch', () => <SwitchState />)
  .add('Single No Options', () => <SingleNoOptionsState />)
  .add('Multiple No Options', () => <NoOptionsState />)
  .add('Single Disabled', () => <SingleDisabledState />)
  .add('Multiple Disabled', () => <MultipleDisabledState />)
  .add('Radios Disabled', () => <RadiosDisabledState />)
  .add('Checkboxes Disabled', () => <CheckboxesDisabledState />)
  .add('Switch Disabled', () => <SwitchDisabledState />)
  .add('No Duplicates', () => <NoDuplicatesState />)
