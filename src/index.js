"use strict"

import ReactDOM from 'react-dom'
import React from 'react'
import {Interface} from './interface.jsx'
import {Socket} from './core/socket.js'

new Socket();

ReactDOM.render(
  <Interface />,
  document.getElementById('monitoring')
);
