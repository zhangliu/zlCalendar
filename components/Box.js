import React from 'react'

class Box extends React.Component {
  constructor(props) {
    super(props)
    this.onMouseOver = this.onMouseOver.bind(this)
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
  }

  render() {
    const config = this.props.config
    return (
      <div
        ref='box'
        style={{width: config.box.width, height: config.box.height}}
        className='box'
        id={`box${this.props.boxListIndex}:${this.props.boxIndex}`}
        onMouseOver={this.onMouseOver}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}>
      </div>
    )
  }

  onMouseDown() {
    const box = {
      boxListIndex: this.props.boxListIndex,
      boxIndex: this.props.boxIndex,
    }
    this.props.onUpdateMouseDownBox(box)
  }

  onMouseOver() {
    const box = {
      boxListIndex: this.props.boxListIndex,
      boxIndex: this.props.boxIndex,
    }
    this.props.onUpdateMouseOverBox(box)
  }

  onMouseUp() {
    const box = {
      boxListIndex: this.props.boxListIndex,
      boxIndex: this.props.boxIndex,
    }
    this.props.onUpdateMouseUpBox(box)
  }
}

export default Box
