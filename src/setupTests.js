import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

global.console.error = jest.fn()

jest.mock('./hooks/useRefRect/useRefRect', () => () => ({
  "bottom": 80,
  "height": 80,
  "left": 0,
  "right": 200,
  "top": 0,
  "width": 200,
  "x": 0,
  "y": 600,
}))

jest.mock('./hooks/usePlaceAbove/usePlaceAbove', () => () => true)
