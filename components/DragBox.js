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
    this.boxConfig = this.props.config.box
    this.currentBox = null
  }

  render() {
    const startBox = this.props.data.startBox;
    let overBox = this.props.data.overBox;
    overBox = overBox ? overBox : startBox;

    const top = overBox.boxIndex >= startBox.boxIndex
      ? startBox.boxIndex * this.boxConfig.height
      : overBox.boxIndex * this.boxConfig.height

    const height = (Math.abs(overBox.boxIndex - startBox.boxIndex) + 1)
      * this.boxConfig.height - 5
    const style = {
      top: top,
      left: this.boxConfig.width * startBox.boxListIndex,
      width: this.boxConfig.width - 5,
      height: height,
    }
    return (
      <div
        draggable={this.props.data.endBox ? true : false}
        className={this.props.data.endBox ? 'dragedBox' : 'dragingBox'}
        style={style}
        onDragStart={this.onDragStart}
        onDragOver={this.onDragOver}
        onDragEnd={this.onDragEnd}
        onMouseMove={this.onMouseMove}
        onMouseUp={this.onMouseUp}>
        <div>{this.props.data.content}</div>
        <span onMouseDown={this.onDragSpanMouseDown}></span>
      </div>
    )
  }

  onMouseMove(e) {
    if (this.props.data.endBox) {
      return;
    }
    let overBox = this.props.data.overBox
    overBox = overBox ? overBox : this.props.data.startBox

    const currentBox = this.getCurrentBox(e)
    if (overBox.boxIndex === currentBox.boxIndex) {
      return
    }
    this.props.onUpdateOverBox(currentBox)
  }

  getCurrentBox(e) {
    const startBox = this.props.data.startBox;
    let overBox = this.props.data.overBox;
    overBox = overBox ? overBox : startBox;

    const position = mouseHelper.getRelativePosition(e)

    let dragBoxStartBox = null
    if (overBox.boxIndex >= startBox.boxIndex) {
      dragBoxStartBox = startBox
    } else {
      dragBoxStartBox = overBox
    }
    const currentBox = {
      boxListIndex: dragBoxStartBox.boxListIndex,
      boxIndex: dragBoxStartBox.boxIndex + Math.floor(position.top / this.boxConfig.height),
    }
    return currentBox
  }

  onMouseUp(e) {
    const currentBox = this.getCurrentBox(e)
    this.props.onUpdateEndBox(currentBox)
  }

  onDragSpanMouseDown() {
    this.props.onDeleteEndBox(this.props.data.id)
  }

  onDragStart(e) {
    const currentBox = this.getCurrentBox(e)
    e.dataTransfer.setDragImage(this.props.config.dragBox.dragImg, 0, 0);
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
