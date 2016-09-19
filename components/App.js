import React from 'react'
import BoxTable from './BoxTable'
import DragBoxList from './DragBoxList'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mouseHistories: [],
    }

    this.histoyId = 1
  }


  render() {
    return (
      <div className='app'>
        <BoxTable
          config={this.props.config}
          onUpdateMouseDownBox={this.onUpdateMouseDownBox.bind(this)}
          onUpdateMouseUpBox={this.onUpdateMouseUpBox.bind(this)}
          onUpdateMouseOverBox={this.onUpdateMouseOverBox.bind(this)}
          onUpdateDragOverBox={this.onUpdateDragOverBox.bind(this)}>
        </BoxTable>
        <DragBoxList
          config={this.props.config}
          onUpdateMouseDownBox={this.onUpdateMouseDownBox.bind(this)}
          onUpdateMouseUpBox={this.onUpdateMouseUpBox.bind(this)}
          onUpdateMouseOverBox={this.onUpdateMouseOverBox.bind(this)}
          onDeleteMouseUpBox={this.onDeleteMouseUpBox.bind(this)}
          onUpdateDragStartBox={this.onUpdateDragStartBox.bind(this)}
          onUpdateDragOverBox={this.onUpdateDragOverBox.bind(this)}
          data={this.state.mouseHistories}/>
      </div>
    )
  }

  onUpdateMouseDownBox(box) {
    const histories = this.state.mouseHistories
    histories.push({id: this.histoyId++, mouseDownBox: box})
    this.setState(this.state)
  }

  onUpdateMouseOverBox(box) {
    const histories = this.state.mouseHistories
    const histoy = histories.find(h => !h.mouseUpBox)
    if (!histoy) {
      return
    }
    histoy.mouseOverBox = box
    this.setState(this.state)
  }

  onUpdateMouseUpBox(box) {
    const histories = this.state.mouseHistories
    const histoy = histories.find(h => !h.mouseUpBox)
    if (!histoy) {
      return;
    }
    histoy.mouseUpBox = box

    [histoy.mouseDownBox.boxIndex, histoy.mouseUpBox.boxIndex, histoy.mouseOverBox.boxIndex]
      = [histoy.mouseDownBox.boxIndex, histoy.mouseUpBox.boxIndex, histoy.mouseOverBox.boxIndex].sort()

    this.setState(this.state)
  }

  onDeleteMouseUpBox(id) {
    const histories = this.state.mouseHistories
    const histoy = histories.find(h => h.id === id)
    histoy.mouseUpBox = null
    this.setState(this.state)
  }

  onUpdateDragStartBox(id, dragStartBox) {
    const histories = this.state.mouseHistories
    let histoy = histories.find(h => h.dragStartBox)
    if (histoy) {
      histoy.dragStartBox = null;
    }
    histoy = histories.find(h => h.id === id)
    histoy.dragStartBox = dragStartBox
    this.setState(this.state)
  }

  onUpdateDragOverBox(dragOverBox) {
    const histories = this.state.mouseHistories
    const histoy = histories.find(h => h.dragStartBox)
    if (!histoy) {
      return
    }
    const offsetTopBoxNum = dragOverBox.boxIndex - histoy.dragStartBox.boxIndex

    // 判断有没有拖越界
    const [minIndex, maxIndex] = [histoy.mouseDownBox.boxIndex, histoy.mouseUpBox.boxIndex].sort()

    if ((maxIndex + offsetTopBoxNum > this.props.config.boxList.boxNum - 1)
          || (minIndex + offsetTopBoxNum < 0)) {
      return
    }
    // 修正偏移量
    const keys = Object.keys(histoy)
    for (const key of keys) {
      if (!histoy[key] || isNaN(histoy[key].boxListIndex)) {
        continue
      }
      histoy[key].boxListIndex = dragOverBox.boxListIndex
      histoy[key].boxIndex = histoy[key].boxIndex + offsetTopBoxNum
    }
    this.setState(this.state)
  }
}

export default App
