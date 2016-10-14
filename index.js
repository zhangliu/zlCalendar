/* global document */

import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import App from './zlCalendar'

const config = {
  dragBox: {
    onChange: (obj) => {},
  },

  header: {
    onWeekChange: (obj) => {
      console.log(obj.startTime, obj.endTime)
      const histories = obj.mouseHistories.map(h => {
        h.overBox.boxIndex++
        return h
      })
      obj.setMouseHistories(histories)
    },
  },
}

render(<App
  mouseHistories={[]}
  config={config}/>, document.getElementById('container'))
