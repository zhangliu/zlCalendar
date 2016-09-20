/* global document */

import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import App from './components/App'

import './styles/index.scss'

const config = {}

render(<App
  mouseHistories={[]}
  config={config}/>, document.getElementById('container'))
