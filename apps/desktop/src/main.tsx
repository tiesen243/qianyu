import React from 'react'
import ReactDOM from 'react-dom/client'

import Root from '@/routes/__root'

ReactDOM.createRoot(document.querySelector('#root') as HTMLElement).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
)
