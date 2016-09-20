/* global document */

import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import App from './components/App'

import './styles/index.scss'

const config = {
  dragBox: {
    onOver: (obj) => {
      obj.setContent(`${obj.startBox.boxListIndex}:${obj.startBox.boxIndex}
        ~
        ${obj.endBox.boxListIndex}:${obj.endBox.boxIndex}`)
    },

    onChange: (obj) => {
      obj.setContent(`${obj.startBox.boxListIndex}:${obj.startBox.boxIndex}
        ~
        ${obj.endBox.boxListIndex}:${obj.endBox.boxIndex}`)
    },
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
