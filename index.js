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
    scopes: {
      A1: [8 * 60 + 30, 9 * 60 + 30],
      A2: [9 * 60 + 30, 10 * 60 + 30],
      B1: [10 * 60 + 40, 11 * 60 + 40],
      B2: [11 * 60 + 40, 12 * 60 + 40],
      C1: [13 * 60 + 30, 14 * 60 + 30],
      C2: [14 * 60 + 30, 15 * 60 + 30],
      D1: [15 * 60 + 40, 16 * 60 + 40],
      D2: [16 * 60 + 40, 17 * 60 + 40],
      E1: [18 * 60 + 30, 19 * 60 + 30],
      E2: [19 * 60 + 30, 20 * 60 + 30],
    },
  },
}

function getTimeTitle(history, timeConfig) {
  const keys = Object.keys(timeConfig.scopes)
  const startKey = keys[history.startBox.boxIndex]
  const endKey = keys[history.overBox.boxIndex]
  return startKey === endKey ? startKey : `${startKey}~${endKey}`
}

render(<App
  ref={n => calendar = n}
  mouseHistories={[]}
  config={config}/>, document.getElementById('container'))
