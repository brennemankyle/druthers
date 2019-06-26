import React from 'react'
import AppPropTypes from '../../utils/AppPropTypes'

let Container = (props) => {
  return <div className={props.className}>{props.children}</div>
}

Container.propTypes = {
  styles: AppPropTypes.styles.isRequired,
}

export default Container
