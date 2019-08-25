import React, { useState } from 'react'
import { NewInput } from './index'

let options = [
  {value: '1', label: 'Option 1'},
  {value: '2', label: 'Option 2'},
  {value: '3', label: 'Pickle'},
  {value: '4', label: 'Pick'},
  {value: '5', label: 'a Pickle'},
  {value: '6', label: 'Pi'},
  {value: '7', label: 'a Pie'},
  {value: '8', label: 'a Pie is nice'},
  {value: '9', label: 'Pie'},
  {value: '10', label: 'a Pickle is not Pie'},
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

let App = () => {
  const [selectionSingle, setSelectionSingle] = useState()
  const [selectionMultiple, setSelectionMultiple] = useState([])
  const [selectionSingleCreate, setSelectionSingleCreate] = useState('1')
  const [selectionMultipleCreate, setSelectionMultipleCreate] = useState(['1'])
  const [selectionAppendToBody, setSelectionAppendToBody] = useState(['1'])
  const [selectionRightToLeft, setSelectionRightToLeft] = useState()
  const [selectionRadio, setSelectionRadio] = useState()
  const [selectionCheck, setSelectionCheck] = useState()
  const [selectionSwitch, setSelectionSwitch] = useState()
  const [selectionNoDuplicates, setSelectionNoDuplicates] = useState([])

  return (
    <div className="App">
      <h1>Single</h1>
      <NewInput name="Single" selection={selectionSingle} onChange={(e) => setSelectionSingle(e.target.value)} options={options} />

      <h1>Multiple</h1>
      <NewInput name="Multiple" selection={selectionMultiple} onChange={(e) => setSelectionMultiple(e.target.value)} options={options} multiple={true} />

      <h1>Create Single</h1>
      <NewInput name="SingleCreate" selection={selectionSingleCreate} onChange={(e) => setSelectionSingleCreate(e.target.value)} options={options} creatable={true} />

      <h1>Create Multiple</h1>
      <NewInput name="MultipleCreate" selection={selectionMultipleCreate} onChange={(e) => setSelectionMultipleCreate(e.target.value)} options={options} creatable={true} multiple={true} />

      <h1>Append to body</h1>
      <NewInput name="AppendToBody" selection={selectionAppendToBody} onChange={(e) => setSelectionAppendToBody(e.target.value)} options={options} creatable={true} multiple={true} appendToBody={true} />

      <h1>Right to left</h1>
      <NewInput name="RightToLeft" selection={selectionRightToLeft} onChange={(e) => setSelectionRightToLeft(e.target.value)} options={options} rightToLeft={true} />

      <h1>Radios</h1>
      <p>(Only visible if fits on one line, resize window to see)</p>
      <NewInput name="Radios" selection={selectionRadio} onChange={(e) => setSelectionRadio(e.target.value)} options={checkRadioOptions} />

      <h1>Checkboxes</h1>
      <p>(Only visible if fits on one line, resize window to see)</p>
      <NewInput name="Checkboxes" selection={selectionCheck} onChange={(e) => setSelectionCheck(e.target.value)} options={checkRadioOptions} multiple={true} />

      <h1>Switch</h1>
      <p>(Only visible if fits on one line, resize window to see)</p>
      <NewInput name="Switch" selection={selectionSwitch} onChange={(e) => setSelectionSwitch(e.target.value)} options={switchOptions} />

      <h1>Single Disabled</h1>
      <NewInput name="SingleDisabled" selection={['1']} onChange={(e) => setSelectionSingle(e.target.value)} options={options} disabled={true} />

      <h1>Multiple Disabled</h1>
      <NewInput name="MultipleDisabled" selection={['1', '2']} onChange={(e) => setSelectionMultiple(e.target.value)} options={options} multiple={true} disabled={true} />

      <h1>Radios Disabled</h1>
      <p>(Only visible if fits on one line, resize window to see)</p>
      <NewInput name="RadiosDisabled" selection={['1']} onChange={(e) => setSelectionRadio(e.target.value)} options={checkRadioOptions} disabled={true} />

      <h1>Checkboxes Disabled</h1>
      <p>(Only visible if fits on one line, resize window to see)</p>
      <NewInput name="CheckboxesDisabled" selection={['1', '2']} onChange={(e) => setSelectionCheck(e.target.value)} options={checkRadioOptions} multiple={true} disabled={true} />

      <h1>Switch Disabled</h1>
      <p>(Only visible if fits on one line, resize window to see)</p>
      <NewInput name="SwitchDisabled" selection={['true']} onChange={(e) => setSelectionSwitch(e.target.value)} options={switchOptions} disabled={true} />

      <h1>No Duplicates</h1>
      <NewInput name="NoDuplicates" selection={selectionNoDuplicates} onChange={(e) => setSelectionNoDuplicates(e.target.value)} options={duplicateOptions} creatable={true} multiple={true} allowDuplicates={false} />
    </div>
  )
}

export default App
