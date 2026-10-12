import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { installInquiryLinks } from './lib/inquiry'

installInquiryLinks()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
