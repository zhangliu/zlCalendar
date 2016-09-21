import React from 'react'

import './header.scss'

const WEEK_DAYS = {
  1: '周一',
  2: '周二',
  3: '周三',
  4: '周四',
  5: '周五',
  6: '周六',
  0: '周日',
}

const modeType = {
  REPEAT: 0,
  NORMAL: 1,
}

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.currentWeekIndex = 0
    this.state = {days: this.getWeekDays(0), mode: this.props.config.header.mode}
  }

  render() {
    const spanStyle = {
      width: this.props.config.box.width,
    }
    return (
      <div className='header'>
        <div className='oprator'>
          <button className='repeat' onClick={() => this.changeMode(modeType.REPEAT)}>重复周</button>
          <button onClick={() => this.onClick(-1)}>上一周</button>
          <button onClick={() => this.onClick(-this.currentWeekIndex)}>当前周</button>
          <button onClick={() => this.onClick(1)}>下一周</button>
        </div>
        <div className='days'>
          <span className='spanColumn' key={-1} style={spanStyle}>&nbsp;</span>
          {
            this.state.days.map(day => {
              const displayStr = this.state.mode === modeType.NORMAL
                ? `${day.dateString}（${day.weekString}）`
                : day.weekString
              return <span className='spanColumn' key={day.id} style={spanStyle}>{displayStr}</span>
            }
            )
          }
        </div>
      </div>
    )
  }

  getWeekDays(index) {
    const days = []
    const date = new Date()
    const weekIndex = this.currentWeekIndex + index
    this.currentWeekIndex = weekIndex
    date.setDate(date.getDate() + weekIndex * 7) // 到指定的那一周去
    date.setDate(date.getDate() - date.getDay() + 1) // 初始化到周一
    for (let i = 0; i < 7; i++) {
      days.push({
        id: i,
        time: date.getTime(),
        dateString: date.toLocaleDateString().replace(/\d{4}\//, ''),
        weekString: WEEK_DAYS[date.getDay()],
      })
      date.setDate(date.getDate() + 1)
    }
    return days
  }

  onClick(weekIndex) {
    const days = this.getWeekDays(weekIndex)
    this.state.days = days
    this.state.mode = modeType.NORMAL
    this.setState(this.state)
    this.props.onWeekChange(days[0].time, days[days.length - 1].time)
  }

  changeMode(type) {
    this.state.mode = type
    this.setState(this.state)
    // this.props.onWeekRepeat()
  }
}

export default Header
