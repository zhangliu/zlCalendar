import React from 'react'
import DragBox from './DragBox'

class DragBoxList extends React.Component {
  constructor(props) {
    super(props)
    this.dragBoxList = new Map();
  }

  render() {
    return (
      <div className='dragBoxs'>
      {this.getDragBoxs(this.props.data)}
      </div>
    )
  }

  getDragBoxs(dragData) {
    if (dragData.length <= 0) {
      return
    }
    return dragData.map(info => {
      return <DragBox {...this.props} key={info.id} data={info} />
    })
  }
}

export default DragBoxList
