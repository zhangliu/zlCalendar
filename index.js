/* global document */

import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import App from './components/App'

import './styles/index.scss'

const config = {
  box: {
    width: 120, // 单位px
    height: 30,
  },

  boxList: {
    boxNum: 20,
  },

  boxTable: {
    boxListNum: 10,
  },

  dragBox: {
    onMouseUp: (startBox, endBox) => {
      console.log(startBox, endBox)
    },
  },
}

render(<App
  mouseHistories={[]}
  config={config}/>, document.getElementById('container'))
