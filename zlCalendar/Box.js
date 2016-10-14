import React from 'react'
import './box.scss'

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
        className={this.props.boxIndex % 2 ? 'oddBox' : 'evenBox'}
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
    this.props.onUpdateStartBox(box)
  }

  onMouseOver() {
    const box = {
      boxListIndex: this.props.boxListIndex,
      boxIndex: this.props.boxIndex,
    }
    this.props.onUpdateOverBox(box)
  }

  onMouseUp(e) {
    const box = {
      boxListIndex: this.props.boxListIndex,
      boxIndex: this.props.boxIndex,
    }
    this.props.onUpdateEndBox(box, e)
  }
}

export default Box
