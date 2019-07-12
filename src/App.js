import React, { useState } from 'react'
import './App.css'
import SimpleNewInput from './components/SimpleNewInput/SimpleNewInput'

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

let App = () => {
  const [selectionSingle, setSelectionSingle] = useState()
  const [selectionMultiple, setSelectionMultiple] = useState([])
  const [selectionSingleCreate, setSelectionSingleCreate] = useState('1')
  const [selectionMultipleCreate, setSelectionMultipleCreate] = useState(['1'])
  const [selectionAppendToBody, setSelectionAppendToBody] = useState(['1'])
  const [selectionRightToLeft, setSelectionRightToLeft] = useState()

  return (
    <div className="App">
      <h1>Single</h1>
      <SimpleNewInput selection={selectionSingle} onChange={(e) => setSelectionSingle(e.target.value)} options={options} />

      <h1>Multiple</h1>
      <SimpleNewInput selection={selectionMultiple} onChange={(e) => setSelectionMultiple(e.target.value)} options={options} multiple={true} />

      <h1>Create Single</h1>
      <SimpleNewInput selection={selectionSingleCreate} onChange={(e) => setSelectionSingleCreate(e.target.value)} options={options} creatable={true} />

      <h1>Create Multiple</h1>
      <SimpleNewInput selection={selectionMultipleCreate} onChange={(e) => setSelectionMultipleCreate(e.target.value)} options={options} creatable={true} multiple={true} />

      <h1>Append to body</h1>
      <SimpleNewInput selection={selectionAppendToBody} onChange={(e) => setSelectionAppendToBody(e.target.value)} options={options} creatable={true} multiple={true} appendToBody={true} />

      <h1>Right to left</h1>
      <SimpleNewInput selection={selectionRightToLeft} onChange={(e) => setSelectionRightToLeft(e.target.value)} options={options} rightToLeft={true} />

      <h1>Single Disabled</h1>
      <SimpleNewInput selection={['1']} onChange={(e) => setSelectionSingle(e.target.value)} options={options} disabled={true} />

      <h1>Multiple Disabled</h1>
      <SimpleNewInput selection={['1', '2']} onChange={(e) => setSelectionMultiple(e.target.value)} options={options} multiple={true} disabled={true} />
    </div>
  )
}

export default App
