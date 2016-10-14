import React from 'react'
import BoxList from './BoxList'
import mouseHelper from './libs/mouseHelper'

import './boxTable.scss'

class BoxTable extends React.Component {
  constructor(props) {
    super(props)
    this.currentBox = null
  }

  render() {
    const boxTable = []
    for (let i = 0; i < this.props.config.boxTable.boxListNum; i++) {
      boxTable.push(<BoxList {...this.props} key={i} boxListIndex={i} />)
    }
    return (
      <div
        className='boxTable'>
        {boxTable}
      </div>
    )

  }
}

export default BoxTable
