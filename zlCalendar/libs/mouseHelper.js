/* global document */
const getRelativePosition = e => {
  let obj = e.currentTarget;
  const position = {
    top: obj.offsetTop,
    left: obj.offsetLeft,
  }
  while (obj = obj.offsetParent) {
    position.top += obj.offsetTop
    position.left += obj.offsetLeft
  }

  position.top = e.clientY + document.body.scrollTop - position.top;
  position.left = e.clientX + document.body.scrollLeft - position.left;
  return position
}

export default {
  getRelativePosition,
}
