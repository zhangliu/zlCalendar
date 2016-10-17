/* global document */

import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import App from './zlCalendar'

let calendar = null

const config = {
  dragBox: {
    onClick: (obj) => {console.log(obj)},
    onChange: (obj) => {
      obj.title = getTimeTitle(obj, config.timeNav)
      obj.content = '生病了不能来上课'
      calendar.setMouseHistorie(obj)
    },
  },

  header: {
    onWeekChange: (obj) => {
      // console.log(obj.startTime, obj.endTime)
    },
  },

  timeNav: {
    startHour: 8,
    endHour: 21,
  },
}

function getTimeTitle(history, timeConfig) {
  const startHour = timeConfig.startHour + Math.floor(history.startBox.boxIndex / 2)
  const endBox = history.endBox ? history.endBox : history.overBox
  const startMinute = history.startBox.boxIndex % 2 ? '30' : '00'
  const endHour = timeConfig.startHour
    + Math.floor(endBox.boxIndex / 2)
    + (endBox.boxIndex % 2 ? 1 : 0)
  const endMinute = endBox.boxIndex % 2 ? '00' : '30'
  return `${startHour}:${startMinute} ~ ${endHour}:${endMinute}`
}

render(<App
  ref={n => calendar = n}
  mouseHistories={[]}
  config={config}/>, document.getElementById('container'))
