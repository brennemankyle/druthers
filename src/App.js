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

function App() {
  return (
    <div className="App">
      <header>Takey</header>
      <br />

      <label>Single</label>
      <Takey selected={selectedSingle} options={options} placeholder={placeholder} />
      <br />

      <label>Multiple</label>
      <Takey selected={selectedMultiple} options={options} placeholder={placeholder} multiple={true} />
      <br />

      <label>Create Single</label>
      <Takey selected={selectedSingle} options={options} placeholder={placeholder} creatable={true} />
      <br />

      <label>Create Multiple</label>
      <Takey selected={selectedMultiple} options={options} placeholder={placeholder} creatable={true} multiple={true} />
      <br />
    </div>
  )
}

export default App
