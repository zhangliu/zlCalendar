import React from 'react'
import BoxList from './BoxList'
import mouseHelper from './libs/mouseHelper'

import './timeNav.scss'

class TimeNav extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const navs = []
    const style = {
      width: this.props.config.box.width,
      height: this.props.config.box.height,
      lineHeight: `${this.props.config.box.height}px`,
    }
    const scopes = this.props.config.timeNav.scopes
    const keys = Object.keys(scopes)
    let i = 0
    for (const key of keys) {
      const className = i % 2 ? 'evenSpan' : 'oddSpan'
      navs.push(<span style={style} className={className} key={i++}>{key}</span>)
    }
    return (
      <div className='timeNav'>
        {navs}
      </div>
    )

  }
}

export default TimeNav
