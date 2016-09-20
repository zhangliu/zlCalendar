import React from 'react'
import BoxList from './BoxList'
import mouseHelper from '../libs/mouseHelper'

const MINUTES = 24 * 60

class TimeNav extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const navs = []
    const offsetMinutes = Math.floor(MINUTES / this.props.config.boxList.boxNum)
    const style = {
      width: this.props.config.box.width,
      height: this.props.config.box.height,
    }
    for (let i = 0; i < this.props.config.boxList.boxNum; i++) {
      const hours = Math.ceil(offsetMinutes * (i + 1) / 60)
      const timeStr = hours <= 12 ? `上午${hours}点` : `下午${hours}点`
      if (i % 2) {
        navs.push(<span style={style} className='evenSpan' key={i}></span>)
      } else {
        navs.push(<span style={style} className='oddSpan' key={i}>{timeStr}</span>)
      }
    }
    return (
      <div className='timeNav'>
        {navs}
      </div>
    )

  }
}

export default TimeNav
