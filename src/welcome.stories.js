import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { mockStyles } from './mocks'
import props from './utils/defaultProps'
import NewInput from './components/NewInput/NewInput'

let options = [
  {value: '1', label: 'Option 1'},
  {value: '2', label: 'Option 2'},
]

let State = () => {
  const [selectionMultipleCreate, setSelectionMultipleCreate] = useState([])

  return <NewInput
    selection={selectionMultipleCreate}
    onChange={(e) => setSelectionMultipleCreate(e.target.value)}
    options={options}
    creatable={true}
    multiple={true} />
}

storiesOf('Demo', module)
  .add('Multi NewInput Creatable', () => <State />)
