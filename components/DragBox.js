import React from 'react'
import mouseHelper from '../libs/mouseHelper'

class DragBox extends React.Component {
  constructor(props) {
    super(props)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
    this.onDragSpanMouseDown = this.onDragSpanMouseDown.bind(this)
    this.onDragStart = this.onDragStart.bind(this)
    this.onDragOver = this.onDragOver.bind(this)
    this.boxConfig = this.props.config.box;
    this.currentBox = null;
  }

  render() {
    const mouseDownBox = this.props.data.mouseDownBox;
    let mouseOverBox = this.props.data.mouseOverBox;
    mouseOverBox = mouseOverBox ? mouseOverBox : mouseDownBox;

    const top = mouseOverBox.boxIndex >= mouseDownBox.boxIndex
      ? mouseDownBox.boxIndex * this.boxConfig.height
      : mouseOverBox.boxIndex * this.boxConfig.height

    const height = (Math.abs(mouseOverBox.boxIndex - mouseDownBox.boxIndex) + 1)
      * this.boxConfig.height - 5
    const style = {
      top: top,
      left: this.boxConfig.width * mouseDownBox.boxListIndex,
      width: this.boxConfig.width - 5,
      height: height,
    }
    return (
      <div
      draggable={this.props.data.mouseUpBox ? true : false}
      className={this.props.data.mouseUpBox ? 'dragedBox' : 'dragingBox'}
      style={style}
      onDragStart={this.onDragStart}
      onDragOver={this.onDragOver}
      onDragEnd={this.onDragEnd}
      onMouseMove={this.onMouseMove}
      onMouseUp={this.onMouseUp}>
        <span onMouseDown={this.onDragSpanMouseDown}></span>
      </div>
    )
  }

  onMouseMove(e) {
    if (this.props.data.mouseUpBox) {
      return;
    }
    let mouseOverBox = this.props.data.mouseOverBox
    mouseOverBox = mouseOverBox ? mouseOverBox : this.props.data.mouseDownBox

    const currentBox = this.getCurrentBox(e)
    if (mouseOverBox.boxIndex === currentBox.boxIndex) {
      return
    }
    this.props.onUpdateMouseOverBox(currentBox)
  }

  getCurrentBox(e) {
    const mouseDownBox = this.props.data.mouseDownBox;
    let mouseOverBox = this.props.data.mouseOverBox;
    mouseOverBox = mouseOverBox ? mouseOverBox : mouseDownBox;

    const position = mouseHelper.getRelativePosition(e)

    let dragBoxStartBox = null
    if (mouseOverBox.boxIndex >= mouseDownBox.boxIndex) {
      dragBoxStartBox = mouseDownBox
    } else {
      dragBoxStartBox = mouseOverBox
    }
    const currentBox = {
      boxListIndex: dragBoxStartBox.boxListIndex,
      boxIndex: dragBoxStartBox.boxIndex + Math.floor(position.top / this.boxConfig.height),
    }
    return currentBox
  }

  onMouseUp(e) {
    const currentBox = this.getCurrentBox(e)
    this.props.onUpdateMouseUpBox(currentBox)
  }

  onDragSpanMouseDown() {
    this.props.onDeleteMouseUpBox(this.props.data.id)
  }

  onDragStart(e) {
    const currentBox = this.getCurrentBox(e)
    this.props.onUpdateDragStartBox(this.props.data.id, currentBox)
  }

  onDragOver(e) {
    const currentBox = this.getCurrentBox(e)
    if (this.currentBox
      && this.currentBox.boxListIndex === currentBox.boxListIndex
      && this.currentBox.boxIndex === currentBox.boxIndex) {
      return
    }
    this.currentBox = currentBox
    this.props.onUpdateDragOverBox(currentBox)
  }
}

export default DragBox
