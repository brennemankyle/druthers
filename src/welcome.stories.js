import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { mockStyles } from './mocks'
import defaultProps from './utils/defaultProps'
import NewInput from './components/NewInput/NewInput'

let trueFalse = [
  {value: true, label: 'True'},
  {value: false, label: 'False'},
]

let Config = () => {
  const [name, setName] = useState(defaultProps.name || 'defaultName')
  const [options, setOptions] = useState(['Option 1', 'Option 2'])
  const [placeholder, setPlaceholder] = useState(defaultProps.placeholder)
  const [multiple, setMultiple] = useState(defaultProps.multiple)
  const [creatable, setCreatable] = useState(defaultProps.creatable)
  const [removable, setRemovable] = useState(defaultProps.removable)
  const [appendToBody, setAppendToBody] = useState(defaultProps.appendToBody)
  const [rightToLeft, setRightToLeft] = useState(defaultProps.rightToLeft)
  const [allowDuplicates, setAllowDuplicates] = useState(defaultProps.allowDuplicates)
  const [checkRadioMaxCount, setCheckRadioMaxCount] = useState(defaultProps.checkRadioMaxCount)
  // Text
  const [text_noOptions, setText_noOptions] = useState(defaultProps.text_noOptions)
  const [text_create, setText_create] = useState(defaultProps.text_create)
  // Styles
  const [styles_fontSize, setStyles_fontSize] = useState(defaultProps.styles_fontSize)
  const [styles_borderRadius, setStyles_borderRadius] = useState(defaultProps.styles_borderRadius)
  const [styles_paddingTop, setStyles_paddingTop] = useState(defaultProps.styles_paddingTop)
  const [styles_paddingBottom, setStyles_paddingBottom] = useState(defaultProps.styles_paddingBottom)
  const [styles_paddingLeft, setStyles_paddingLeft] = useState(defaultProps.styles_paddingLeft)
  const [styles_paddingRight, setStyles_paddingRight] = useState(defaultProps.styles_paddingRight)
  const [styles_selection_paddingTop, setStyles_selection_paddingTop] = useState(defaultProps.styles_selection_paddingTop)
  const [styles_selection_paddingBottom, setStyles_selection_paddingBottom] = useState(defaultProps.styles_selection_paddingBottom)
  const [styles_selection_paddingLeft, setStyles_selection_paddingLeft] = useState(defaultProps.styles_selection_paddingLeft)
  const [styles_selection_paddingRight, setStyles_selection_paddingRight] = useState(defaultProps.styles_selection_paddingRight)
  const [styles_selection_margin, setStyles_selection_margin] = useState(defaultProps.styles_selection_margin)
  const [styles_option_paddingTop, setStyles_option_paddingTop] = useState(defaultProps.styles_option_paddingTop)
  const [styles_option_paddingBottom, setStyles_option_paddingBottom] = useState(defaultProps.styles_option_paddingBottom)
  const [styles_option_paddingLeft, setStyles_option_paddingLeft] = useState(defaultProps.styles_option_paddingLeft)
  const [styles_option_paddingRight, setStyles_option_paddingRight] = useState(defaultProps.styles_option_paddingRight)
  const [styles_checkRadio_borderWidth, setStyles_checkRadio_borderWidth] = useState(defaultProps.styles_checkRadio_borderWidth)
  const [styles_checkRadio_marginBetween, setStyles_checkRadio_marginBetween] = useState(defaultProps.styles_checkRadio_marginBetween)
  const [styles_checkRadio_labelMargin, setStyles_checkRadio_labelMargin] = useState(defaultProps.styles_checkRadio_labelMargin)
  const [styles_checkRadio_paddingTop, setStyles_checkRadio_paddingTop] = useState(defaultProps.styles_checkRadio_paddingTop)
  const [styles_checkRadio_paddingBottom, setStyles_checkRadio_paddingBottom] = useState(defaultProps.styles_checkRadio_paddingBottom)
  const [styles_checkRadio_paddingLeft, setStyles_checkRadio_paddingLeft] = useState(defaultProps.styles_checkRadio_paddingLeft)
  const [styles_checkRadio_paddingRight, setStyles_checkRadio_paddingRight] = useState(defaultProps.styles_checkRadio_paddingRight)
  const [styles_search_width, setStyles_search_width] = useState(defaultProps.styles_search_width)
  const [styles_icon_width, setStyles_icon_width] = useState(defaultProps.styles_icon_width)
  const [styles_colors_primary, setStyles_colors_primary] = useState(defaultProps.styles_colors_primary)
  const [styles_colors_secondary, setStyles_colors_secondary] = useState(defaultProps.styles_colors_secondary)
  const [styles_colors_highlight, setStyles_colors_highlight] = useState(defaultProps.styles_colors_highlight)
  const [styles_colors_warning, setStyles_colors_warning] = useState(defaultProps.styles_colors_warning)
  const [styles_colors_warningBold, setStyles_colors_warningBold] = useState(defaultProps.styles_colors_warningBold)
  const [styles_colors_disabled, setStyles_colors_disabled] = useState(defaultProps.styles_colors_disabled)
  const [styles_colors_background, setStyles_colors_background] = useState(defaultProps.styles_colors_background)


  const [selectionMultipleCreate, setSelectionMultipleCreate] = useState([])

  return <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <div style={{width: '45%', flexShrink: 0, flexGrow: 0}}>
        <h1>Configure</h1>
        <label>name
          <NewInput
            name="name"
            selection={name}
            onChange={(e) => setName(e.target.value)}
            creatable={true} />
        </label>
        <label>options
          <NewInput
            name="options"
            selection={options}
            onChange={(e) => setOptions(e.target.value)}
            creatable={true}
            multiple={true} />
        </label>
        <label>placeholder
          <NewInput
            name="placeholder"
            selection={placeholder}
            onChange={(e) => setPlaceholder(e.target.value)}
            creatable={true} />
        </label>
        <label>multiple
          <NewInput
            name="multiple"
            selection={multiple}
            options={trueFalse}
            onChange={(e) => setMultiple(e.target.value === 'true')} />
        </label>
        <label>creatable
          <NewInput
            name="creatable"
            selection={creatable}
            options={trueFalse}
            onChange={(e) => setCreatable(e.target.value === 'true')} />
        </label>
        <label>removable
          <NewInput
            name="removable"
            selection={removable}
            options={trueFalse}
            onChange={(e) => setRemovable(e.target.value === 'true')} />
        </label>
        <label>appendToBody
          <NewInput
            name="appendToBody"
            selection={appendToBody}
            options={trueFalse}
            onChange={(e) => setAppendToBody(e.target.value === 'true')} />
        </label>
        <label>rightToLeft
          <NewInput
            name="rightToLeft"
            selection={rightToLeft}
            options={trueFalse}
            onChange={(e) => setRightToLeft(e.target.value === 'true')} />
        </label>
        <label>allowDuplicates
          <NewInput
            name="allowDuplicates"
            selection={allowDuplicates}
            options={trueFalse}
            onChange={(e) => setAllowDuplicates(e.target.value === 'true')} />
        </label>
        <label>checkRadioMaxCount
          <NewInput
            name="checkRadioMaxCount"
            selection={checkRadioMaxCount}
            onChange={(e) => setCheckRadioMaxCount(e.target.value)}
            creatable={true} />
        </label>
        <label>text_noOptions
          <NewInput
            name="text_noOptions"
            selection={text_noOptions}
            onChange={(e) => setText_noOptions(e.target.value)}
            creatable={true} />
        </label>
        <label>text_create
          <NewInput
            name="text_create"
            selection={text_create}
            onChange={(e) => setText_create(e.target.value)}
            creatable={true} />
        </label>
        <h3>Styles</h3>
        <label>styles_fontSize
          <NewInput
            name="styles_fontSize"
            selection={styles_fontSize}
            onChange={(e) => setStyles_fontSize(e.target.value)}
            creatable={true} />
        </label>
        <label>styles_borderRadius
          <NewInput
            name="styles_borderRadius"
            selection={styles_borderRadius}
            onChange={(e) => setStyles_borderRadius(e.target.value)}
            creatable={true} />
        </label>
        <label>styles_paddingTop
          <NewInput
            name="styles_paddingTop"
            selection={styles_paddingTop}
            onChange={(e) => setStyles_paddingTop(e.target.value)}
            creatable={true} />
        </label>
        <label>styles_paddingBottom
          <NewInput
            name="styles_paddingBottom"
            selection={styles_paddingBottom}
            onChange={(e) => setStyles_paddingBottom(e.target.value)}
            creatable={true} />
        </label>
        <label>styles_paddingLeft
          <NewInput
            name="styles_paddingLeft"
            selection={styles_paddingLeft}
            onChange={(e) => setStyles_paddingLeft(e.target.value)}
            creatable={true} />
        </label>
        <label>styles_paddingRight
          <NewInput
            name="styles_paddingRight"
            selection={styles_paddingRight}
            onChange={(e) => setStyles_paddingRight(e.target.value)}
            creatable={true} />
        </label>
        <label>styles_selection_paddingTop
          <NewInput
            name="styles_selection_paddingTop"
            selection={styles_selection_paddingTop}
            onChange={(e) => setStyles_selection_paddingTop(e.target.value)}
            creatable={true} />
        </label>
        <label>styles_selection_paddingBottom
          <NewInput
            name="styles_selection_paddingBottom"
            selection={styles_selection_paddingBottom}
            onChange={(e) => setStyles_selection_paddingBottom(e.target.value)}
            creatable={true} />
        </label>
        <label>styles_selection_paddingLeft
          <NewInput
            name="styles_selection_paddingLeft"
            selection={styles_selection_paddingLeft}
            onChange={(e) => setStyles_selection_paddingLeft(e.target.value)}
            creatable={true} />
        </label>
        <label>styles_selection_paddingRight
          <NewInput
            name="styles_selection_paddingRight"
            selection={styles_selection_paddingRight}
            onChange={(e) => setStyles_selection_paddingRight(e.target.value)}
            creatable={true} />
        </label>
        <label>styles_selection_margin
          <NewInput
            name="styles_selection_margin"
            selection={styles_selection_margin}
            onChange={(e) => setStyles_selection_margin(e.target.value)}
            creatable={true} />
        </label>
        <label>styles_option_paddingTop
          <NewInput
            name="styles_option_paddingTop"
            selection={styles_option_paddingTop}
            onChange={(e) => setStyles_option_paddingTop(e.target.value)}
            creatable={true} />
        </label>
        <label>styles_option_paddingBottom
          <NewInput
            name="styles_option_paddingBottom"
            selection={styles_option_paddingBottom}
            onChange={(e) => setStyles_option_paddingBottom(e.target.value)}
            creatable={true} />
        </label>
        <label>styles_option_paddingLeft
          <NewInput
            name="styles_option_paddingLeft"
            selection={styles_option_paddingLeft}
            onChange={(e) => setStyles_option_paddingLeft(e.target.value)}
            creatable={true} />
        </label>
        <label>styles_option_paddingRight
          <NewInput
            name="styles_option_paddingRight"
            selection={styles_option_paddingRight}
            onChange={(e) => setStyles_option_paddingRight(e.target.value)}
            creatable={true} />
        </label>
        <label>styles_checkRadio_borderWidth
          <NewInput
            name="styles_checkRadio_borderWidth"
            selection={styles_checkRadio_borderWidth}
            onChange={(e) => setStyles_checkRadio_borderWidth(e.target.value)}
            creatable={true} />
        </label>
        <label>styles_checkRadio_marginBetween
          <NewInput
            name="styles_checkRadio_marginBetween"
            selection={styles_checkRadio_marginBetween}
            onChange={(e) => setStyles_checkRadio_marginBetween(e.target.value)}
            creatable={true} />
        </label>
        <label>styles_checkRadio_labelMargin
          <NewInput
            name="styles_checkRadio_labelMargin"
            selection={styles_checkRadio_labelMargin}
            onChange={(e) => setStyles_checkRadio_labelMargin(e.target.value)}
            creatable={true} />
        </label>
        <label>styles_checkRadio_paddingTop
          <NewInput
            name="styles_checkRadio_paddingTop"
            selection={styles_checkRadio_paddingTop}
            onChange={(e) => setStyles_checkRadio_paddingTop(e.target.value)}
            creatable={true} />
        </label>
        <label>styles_checkRadio_paddingBottom
          <NewInput
            name="styles_checkRadio_paddingBottom"
            selection={styles_checkRadio_paddingBottom}
            onChange={(e) => setStyles_checkRadio_paddingBottom(e.target.value)}
            creatable={true} />
        </label>
        <label>styles_checkRadio_paddingLeft
          <NewInput
            name="styles_checkRadio_paddingLeft"
            selection={styles_checkRadio_paddingLeft}
            onChange={(e) => setStyles_checkRadio_paddingLeft(e.target.value)}
            creatable={true} />
        </label>
        <label>styles_checkRadio_paddingRight
          <NewInput
            name="styles_checkRadio_paddingRight"
            selection={styles_checkRadio_paddingRight}
            onChange={(e) => setStyles_checkRadio_paddingRight(e.target.value)}
            creatable={true} />
        </label>
        <label>styles_search_width
          <NewInput
            name="styles_search_width"
            selection={styles_search_width}
            onChange={(e) => setStyles_search_width(e.target.value)}
            creatable={true} />
        </label>
        <label>styles_icon_width
          <NewInput
            name="styles_icon_width"
            selection={styles_icon_width}
            onChange={(e) => setStyles_icon_width(e.target.value)}
            creatable={true} />
        </label>
        <label>styles_colors_primary
          <NewInput
            name="styles_colors_primary"
            selection={styles_colors_primary}
            onChange={(e) => setStyles_colors_primary(e.target.value)}
            creatable={true} />
        </label>
        <label>styles_colors_secondary
          <NewInput
            name="styles_colors_secondary"
            selection={styles_colors_secondary}
            onChange={(e) => setStyles_colors_secondary(e.target.value)}
            creatable={true} />
        </label>
        <label>styles_colors_highlight
          <NewInput
            name="styles_colors_highlight"
            selection={styles_colors_highlight}
            onChange={(e) => setStyles_colors_highlight(e.target.value)}
            creatable={true} />
        </label>
        <label>styles_colors_warning
          <NewInput
            name="styles_colors_warning"
            selection={styles_colors_warning}
            onChange={(e) => setStyles_colors_warning(e.target.value)}
            creatable={true} />
        </label>
        <label>styles_colors_warningBold
          <NewInput
            name="styles_colors_warningBold"
            selection={styles_colors_warningBold}
            onChange={(e) => setStyles_colors_warningBold(e.target.value)}
            creatable={true} />
        </label>
        <label>styles_colors_disabled
          <NewInput
            name="styles_colors_disabled"
            selection={styles_colors_disabled}
            onChange={(e) => setStyles_colors_disabled(e.target.value)}
            creatable={true} />
        </label>
        <label>styles_colors_background
          <NewInput
            name="styles_colors_background"
            selection={styles_colors_background}
            onChange={(e) => setStyles_colors_background(e.target.value)}
            creatable={true} />
        </label>
      </div>
      <div style={{width: '45%', flexShrink: 0, flexGrow: 0}}>
        <h1>Demo</h1>
        <NewInput
          selection={selectionMultipleCreate}
          onChange={(e) => setSelectionMultipleCreate(e.target.value)}
          name={name}
          options={options.map(option => ({value: option, label: option}))}
          placeholder={placeholder}
          multiple={multiple}
          creatable={creatable}
          removable={removable}
          appendToBody={appendToBody}
          rightToLeft={rightToLeft}
          allowDuplicates={allowDuplicates}
          checkRadioMaxCount={checkRadioMaxCount}
          text_noOptions={text_noOptions}
          text_create={text_create}
          styles_fontSize={styles_fontSize}
          styles_borderRadius={styles_borderRadius}
          styles_paddingTop={styles_paddingTop}
          styles_paddingBottom={styles_paddingBottom}
          styles_paddingLeft={styles_paddingLeft}
          styles_paddingRight={styles_paddingRight}
          styles_selection_paddingTop={styles_selection_paddingTop}
          styles_selection_paddingBottom={styles_selection_paddingBottom}
          styles_selection_paddingLeft={styles_selection_paddingLeft}
          styles_selection_paddingRight={styles_selection_paddingRight}
          styles_selection_margin={styles_selection_margin}
          styles_option_paddingTop={styles_option_paddingTop}
          styles_option_paddingBottom={styles_option_paddingBottom}
          styles_option_paddingLeft={styles_option_paddingLeft}
          styles_option_paddingRight={styles_option_paddingRight}
          styles_checkRadio_borderWidth={styles_checkRadio_borderWidth}
          styles_checkRadio_marginBetween={styles_checkRadio_marginBetween}
          styles_checkRadio_labelMargin={styles_checkRadio_labelMargin}
          styles_checkRadio_paddingTop={styles_checkRadio_paddingTop}
          styles_checkRadio_paddingBottom={styles_checkRadio_paddingBottom}
          styles_checkRadio_paddingLeft={styles_checkRadio_paddingLeft}
          styles_checkRadio_paddingRight={styles_checkRadio_paddingRight}
          styles_search_width={styles_search_width}
          styles_icon_width={styles_icon_width}
          styles_colors_primary={styles_colors_primary}
          styles_colors_secondary={styles_colors_secondary}
          styles_colors_highlight={styles_colors_highlight}
          styles_colors_warning={styles_colors_warning}
          styles_colors_warningBold={styles_colors_warningBold}
          styles_colors_disabled={styles_colors_disabled}
          styles_colors_background={styles_colors_background} />
      </div></div>
}

storiesOf('Welcome', module)
  .add('Demo', () => <Config />)
