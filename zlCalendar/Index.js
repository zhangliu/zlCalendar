/* global Image */
import React from 'react'
import BoxTable from './BoxTable'
import DragBoxList from './DragBoxList'
import Header from './Header'
import TimeNav from './TimeNav'

import {deepAssign} from './libs/utility'

import './index.scss'

class Index extends React.Component {
  constructor(props) {
    super(props)
    const config = {
      box: {
        width: 120, // 单位px
        height: 20,
      },

      boxList: {
        boxNum: 28,
      },

      boxTable: {
        boxListNum: 7,
      },


      dragBox: {
        dragImg: (() => {
          const img = new Image(0, 0)
          img.src = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJA
          AAAC0lEQVR42mNgAAIAAAUAAen63NgAAAAASUVORK5CYII=`
          return img
        })(),

        backgroundColor: '#f83a22',

        onOver: () => {},

        onChange: () => {},
      },

      header: {
        onWeekChange: () => {},
        mode: 0,
      },

      timeNav: {
        startHour: 8,
        endHour: 21,
      },
    }
    this.config = deepAssign(config, this.props.config)
    this.state = {
      mouseHistories: props.mouseHistories,
    }
    this.historyId = 1
  }

  componentDidMount() {
    this.refs.indexTable.onselectstart = () => false
  }

  componentWillUnmount() {
    this.refs.indexTable.onselectstart = null
  }

  render() {
    return (
      <div className='index'>
        <Header
          config={this.config}
          onWeekChange={this.onWeekChange.bind(this)}/>
        <div className='indexContainer'>
          <TimeNav
            config={this.config}/>
          <div ref='indexTable' className='indexTable'>
            <BoxTable
              config={this.config}
              onUpdateStartBox={this.onUpdateStartBox.bind(this)}
              onUpdateEndBox={this.onUpdateEndBox.bind(this)}
              onUpdateOverBox={this.onUpdateOverBox.bind(this)}
              onUpdateDragOverBox={this.onUpdateDragOverBox.bind(this)}>
            </BoxTable>
            <DragBoxList
              config={this.config}
              onUpdateStartBox={this.onUpdateStartBox.bind(this)}
              onUpdateEndBox={this.onUpdateEndBox.bind(this)}
              onUpdateOverBox={this.onUpdateOverBox.bind(this)}
              onDeleteEndBox={this.onDeleteEndBox.bind(this)}
              onUpdateDragStartBox={this.onUpdateDragStartBox.bind(this)}
              onUpdateDragOverBox={this.onUpdateDragOverBox.bind(this)}
              data={this.state.mouseHistories}/>
          </div>
        </div>
      </div>
    )
  }

  onUpdateStartBox(box) {
    const histories = this.state.mouseHistories
    histories.push({id: this.historyId++, startBox: box})
    this.setState(this.state)
  }

  onUpdateOverBox(box) {
    const histories = this.state.mouseHistories
    const history = histories.find(h => !h.endBox)
    if (!history) {
      return
    }
    history.overBox = box
    this.setState(this.state)

    this.noticeChange(history)
  }

  noticeChange(history) {
    if (this.config.dragBox.onChange) {
      this.config.dragBox.onChange({
        startBox: history.startBox,
        endBox: history.overBox,
        content: history.content,
        setContent: (content) => {
          history.content = content
          this.setState(this.state)
        },
      })
    }
  }

  onUpdateEndBox(box) {
    const histories = this.state.mouseHistories
    const history = histories.find(h => !h.endBox)
    if (!history) {
      return;
    }
    history.endBox = box

    if (history.startBox.boxIndex > history.endBox.boxIndex) {
      [history.startBox.boxIndex, history.endBox.boxIndex]
        = [history.endBox.boxIndex, history.startBox.boxIndex]
    }

    history.overBox = Object.assign({}, history.endBox)
    this.setState(this.state)

    this.noticeChange(history)
  }

  onDeleteEndBox(id) {
    const histories = this.state.mouseHistories
    const history = histories.find(h => h.id === id)
    history.endBox = null
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
    const history = histories.find(h => h.dragStartBox && h.endBox)
    if (!history) {
      return
    }
    const offsetTopBoxNum = dragOverBox.boxIndex - history.dragStartBox.boxIndex

    // 判断有没有拖越界
    const [minIndex, maxIndex]
      = [history.startBox.boxIndex, history.endBox.boxIndex].sort((a, b) => a >= b)
    if ((maxIndex + offsetTopBoxNum > this.config.boxList.boxNum - 1)
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
    this.noticeChange(history)
  }

  onWeekChange(startTime, endTime) {
    this.props.config.header.onWeekChange({
      startTime: startTime,
      endTime: endTime,
      mouseHistories: this.state.mouseHistories,
      setMouseHistories: histories => {
        this.state.mouseHistories = histories
        this.setState(this.state)
      },
    })
  }
}

export default Index
