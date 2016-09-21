import React from 'react'
import BoxList from './BoxList'
import mouseHelper from './libs/mouseHelper'

import './timeNav.scss'

const MINUTES = 24 * 60

class TimeNav extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const navs = []
    const style = {
      width: this.props.config.box.width,
      height: this.props.config.box.height,
    }
    const startHour = this.props.config.timeNav.startHour
    const endHour = this.props.config.timeNav.endHour
    for (let i = startHour; i <= endHour; i++) {
      const timeStr = i <= 12 ? `上午${i}点` : `下午${i}点`
      navs.push(<span style={style} className='oddSpan' key={i}>{timeStr}</span>)
      navs.push(<span style={style} className='evenSpan' key={i + 0.5}></span>)
    }
    return (
      <div className='timeNav'>
        {navs}
      </div>
    )

  }
}

export default TimeNav
