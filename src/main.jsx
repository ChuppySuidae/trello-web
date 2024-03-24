import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'

import theme from './theme.js'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssVarsProvider defaultMode="system"
      // The props below are specific to this demo,
      // you might not need them in your app.
      //
      theme={theme}
      // the local storage key to use.
      modeStorageKey="demo_identify-system-mode"
      // set as root provider
      disableNestedContext>
      <CssBaseline />
      <App />
    </CssVarsProvider >
  </React.StrictMode>
)
