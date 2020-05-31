import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { ModalProvider } from 'react-hooks-async-modal'

ReactDOM.render(
    (
        <ModalProvider>
            <App />
        </ModalProvider>
    ),
    document.getElementById('root')
)
