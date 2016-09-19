import React from 'react'
import Box from './Box'

class BoxList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const boxList = []
    for (let i = 0; i < this.props.config.boxList.boxNum; i++) {
      boxList.push(
        <Box
          {...this.props}
          key={i}
          boxIndex={i}/>
      )
    }
    return <div className='boxList'>{boxList}</div>
  }
}

export default BoxList
