import React from 'react'

const WEEK_DAYS = {
  1: '周一',
  2: '周二',
  3: '周三',
  4: '周四',
  5: '周五',
  6: '周六',
  0: '周日',
}

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.currentWeekIndex = 0
    this.state = {days: this.getWeekDays(0)}
  }

  render() {
    const spanStyle = {
      width: this.props.config.box.width,
    }
    return (
      <div className='header'>
        <div className='oprator'>
          <button onClick={() => this.onClick(-1)}>上一周</button>
          <button onClick={() => this.onClick(-this.currentWeekIndex)}>当前周</button>
          <button onClick={() => this.onClick(1)}>下一周</button>
        </div>
        <div className='days'>
          <span key={-1} style={spanStyle}>&nbsp;</span>
          {
            this.state.days.map(day => (
              <span key={day.id} style={spanStyle}>{day.dateString}({day.weekString})</span>
            ))
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
    this.setState({days: days})
    this.props.onWeekChange(days[0].time, days[days.length - 1].time)
  }
}

export default Header
