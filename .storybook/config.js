import { configure } from '@storybook/react'

function loadStories() {
  require('../src/welcome.stories')
  require('../src/stories')
  require('../src/internal.stories')
}

configure(loadStories, module)
