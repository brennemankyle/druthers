// in iOS Safari, touchStart and click get fired. This is a workaround to only use onClick for non iOS browsers
let handleClick = (onClick) => 'ontouchstart' in document.documentElement === true ? (e) => e.preventDefault() : onClick

export default handleClick
