import React from 'react'
import './App.css'
import Takey from './components/Takey/Takey'

let selectedMultiple = [
  '1',
  '2',
]

let selectedSingle = [
  '1'
]

let options = [
  {value: '1', label: 'Option 1'},
  {value: '2', label: 'Option 2'},
]

let placeholder = 'Placeholder'

let App = () => {
  return (
    <div className="App">
      <h1>Single</h1>
      <Takey selected={selectedSingle} options={options} placeholder={placeholder} />

      <h1>Multiple</h1>
      <Takey selected={selectedMultiple} options={options} placeholder={placeholder} multiple={true} />

      <h1>Create Single</h1>
      <Takey selected={selectedSingle} options={options} placeholder={placeholder} creatable={true} />

      <h1>Create Multiple</h1>
      <Takey selected={selectedMultiple} options={options} placeholder={placeholder} creatable={true} multiple={true} />
    </div>
  )
}

export default App
