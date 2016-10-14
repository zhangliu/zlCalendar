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
        // dragImg: (() => {
        //   const img = new Image(0, 0)
        //   img.src = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJA
        //   AAAC0lEQVR42mNgAAIAAAUAAen63NgAAAAASUVORK5CYII=`
        //   return img
        // })(),
        onChange: () => {},
      },

      header: {
        onWeekChange: () => {},
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
    this.historyId = props.mouseHistories.length
  }

  componentWillReceiveProps(props) {
    this.state.mouseHistories = props.mouseHistories
    this.setState(this.state)
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
              onUpdateOverBox={this.onUpdateOverBox.bind(this)}>
            </BoxTable>
            <DragBoxList
              config={this.config}
              onUpdateStartBox={this.onUpdateStartBox.bind(this)}
              onUpdateEndBox={this.onUpdateEndBox.bind(this)}
              onUpdateOverBox={this.onUpdateOverBox.bind(this)}
              onDeleteEndBox={this.onDeleteEndBox.bind(this)}
              data={this.state.mouseHistories}/>
          </div>
        </div>
      </div>
    )
  }

  onUpdateStartBox(box) {
    if (this.props.readOnly) {
      return;
    }
    const histories = this.state.mouseHistories
    histories.push({id: this.historyId++, startBox: box})
    this.setState(this.state)
  }

  onUpdateOverBox(box) {
    if (this.props.readOnly) {
      return;
    }
    const histories = this.state.mouseHistories
    const history = histories.find(h => !h.endBox)
    if (!history) {
      return
    }
    history.overBox = box
    this.setState(this.state)

    this.config.dragBox.onChange(history)
  }

  onUpdateEndBox(box, e) {
    if (this.props.readOnly) {
      return;
    }
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
    this.config.dragBox.onChange(history, e)
  }

  onDeleteEndBox(id) {
    if (this.props.readOnly) {
      return;
    }
    const histories = this.state.mouseHistories
    const history = histories.find(h => h.id === id)
    history.endBox = null
    this.setState(this.state)
  }

  onWeekChange(startTime, endTime) {
    this.props.config.header.onWeekChange({
      startTime: startTime,
      endTime: endTime,
    })
  }

  getMouseHistories() {
    return this.state.mouseHistories
  }

  setMouseHistories(mouseHistories) {
    this.state.mouseHistories = mouseHistories
    this.setState(this.state)
  }
}

export default Index
