import React from 'react'
import './App.css'
import Takey from './components/Takey/Takey'

let selected = [
  1,
 '2'
]

let options = [
  {value: '1', label: 'Option 1'},
  {value: '2', label: 'Option 2'},
]

function App() {
  return (
    <div className="App">
      <header>
        Takey
      </header>
      <Takey selected={selected} options={options}/>
    </div>
  )
}

export default App
