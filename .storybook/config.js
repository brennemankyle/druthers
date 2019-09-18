import { configure, addDecorator } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'

addDecorator(withInfo({
  inline: true,
  header: false,
}))

function loadStories() {
  require('../src/welcome.stories')
  require('../src/stories')
  require('../src/internal.stories')
}

configure(loadStories, module)
