import React from 'react'
import BoxList from './BoxList'
import mouseHelper from '../libs/mouseHelper'

class BoxTable extends React.Component {
  constructor(props) {
    super(props)
    this.onDragOver = this.onDragOver.bind(this)
    this.currentBox = null
  }

  render() {
    const boxTable = []
    for (let i = 0; i < this.props.config.boxTable.boxListNum; i++) {
      boxTable.push(<BoxList {...this.props} key={i} boxListIndex={i} />)
    }
    return (
      <div
        className='boxTable'
        onDragOver={this.onDragOver}>
        {boxTable}
      </div>
    )

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

  getCurrentBox(e) {
    const position = mouseHelper.getRelativePosition(e)
    const currentBox = {
      boxListIndex: Math.floor(position.left / this.props.config.box.width),
      boxIndex: Math.floor(position.top / this.props.config.box.height),
    }
    return currentBox
  }
}

export default BoxTable
