import React from 'react'
import BoxTable from './BoxTable'
import DragBoxList from './DragBoxList'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mouseHistories: props.mouseHistories,
    }
    this.historyId = 1
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
    histories.push({id: this.historyId++, mouseDownBox: box})
    this.setState(this.state)
  }

  onUpdateMouseOverBox(box) {
    const histories = this.state.mouseHistories
    const history = histories.find(h => !h.mouseUpBox)
    if (!history) {
      return
    }
    history.mouseOverBox = box
    this.setState(this.state)
  }

  onUpdateMouseUpBox(box) {
    const histories = this.state.mouseHistories
    const history = histories.find(h => !h.mouseUpBox)
    if (!history) {
      return;
    }
    history.mouseUpBox = box

    if (history.mouseDownBox.boxIndex > history.mouseUpBox.boxIndex) {
      [history.mouseDownBox.boxIndex, history.mouseUpBox.boxIndex]
        = [history.mouseUpBox.boxIndex, history.mouseDownBox.boxIndex]
    }

    history.mouseOverBox = Object.assign({}, history.mouseUpBox)
    this.setState(this.state)
  }

  onDeleteMouseUpBox(id) {
    const histories = this.state.mouseHistories
    const history = histories.find(h => h.id === id)
    history.mouseUpBox = null
    this.setState(this.state)
  }

  onUpdateDragStartBox(id, dragStartBox) {
    const histories = this.state.mouseHistories
    let history = histories.find(h => h.dragStartBox)
    if (history) {
      history.dragStartBox = null;
    }
    history = histories.find(h => h.id === id)
    history.dragStartBox = dragStartBox
    this.setState(this.state)
  }

  onUpdateDragOverBox(dragOverBox) {
    const histories = this.state.mouseHistories
    const history = histories.find(h => h.dragStartBox)
    if (!history) {
      return
    }
    const offsetTopBoxNum = dragOverBox.boxIndex - history.dragStartBox.boxIndex

    // 判断有没有拖越界
    const [minIndex, maxIndex]
      = [history.mouseDownBox.boxIndex, history.mouseUpBox.boxIndex].sort((a, b) => a >= b)
    if ((maxIndex + offsetTopBoxNum > this.props.config.boxList.boxNum - 1)
          || (minIndex + offsetTopBoxNum < 0)) {
      return
    }
    // 修正偏移量
    const keys = Object.keys(history)
    for (const key of keys) {
      if (!history[key] || isNaN(history[key].boxListIndex)) {
        continue
      }
      history[key].boxListIndex = dragOverBox.boxListIndex
      history[key].boxIndex = history[key].boxIndex + offsetTopBoxNum
    }
    this.setState(this.state)
  }
}

export default App
