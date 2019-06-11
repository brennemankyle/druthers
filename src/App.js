import React, { useState } from 'react'
import './App.css'
import Takey from './components/Takey/Takey'

let options = [
  {value: '1', label: 'Option 1'},
  {value: '2', label: 'Option 2'},
]

let placeholder = '...select'

let App = () => {
  const [selectionSingle, setSelectionSingle] = useState()
  const [selectionMultiple, setSelectionMultiple] = useState([])
  const [selectionSingleCreate, setSelectionSingleCreate] = useState('1')
  const [selectionMultipleCreate, setSelectionMultipleCreate] = useState(['1'])

  return (
    <div className="App">
      <h1>Single</h1>
      <Takey selection={selectionSingle} onChange={(e) => setSelectionSingle(e.target.value)} options={options} placeholder={placeholder} />

      <h1>Multiple</h1>
      <Takey selection={selectionMultiple} onChange={(e) => setSelectionMultiple(e.target.value)} options={options} placeholder={placeholder} multiple={true} />

      <h1>Create Single</h1>
      <Takey selection={selectionSingleCreate} onChange={(e) => setSelectionSingleCreate(e.target.value)} options={options} placeholder={placeholder} creatable={true} />

      <h1>Create Multiple</h1>
      <Takey selection={selectionMultipleCreate} onChange={(e) => setSelectionMultipleCreate(e.target.value)} options={options} placeholder={placeholder} creatable={true} multiple={true} />
    </div>
  )
}

export default App
