import React from 'react'
import mouseHelper from './libs/mouseHelper'

import './dragBox.scss'

class DragBox extends React.Component {
  constructor(props) {
    super(props)
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
      * this.boxConfig.height - 2
    const style = {
      top: top,
      left: this.boxConfig.width * startBox.boxListIndex,
      width: this.boxConfig.width - 2,
      height: height,
      backgroundColor: this.props.config.dragBox.backgroundColor,
    }
    return (
      <div
        className={this.props.data.endBox ? 'dragedBox' : 'dragingBox'}
        style={style}
        onMouseMove={this.onMouseMove.bind(this)}
        onClick={this.onClick.bind(this)}
        onMouseUp={this.onMouseUp.bind(this)}>
        <div>
          <span className='titleSpan'>{this.props.data.title}</span>
          <span>{this.props.data.content}</span>
        </div>
        <span className='dragSpan' onMouseDown={this.onDragSpanMouseDown.bind(this)}></span>
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
    this.props.onUpdateEndBox(currentBox, e)
  }

  onClick(e) {
    this.props.config.dragBox.onClick(this.props.data, e)
  }

  onDragSpanMouseDown() {
    this.props.onDeleteEndBox(this.props.data.id)
  }
}

export default DragBox
