// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { AuthProvider } from './contexts/AuthenticaContext'
import 'core-js'
import 'bootstrap-icons/font/bootstrap-icons.css';


import App from './App'
import store from './store'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <AuthProvider>
    <App />
  </AuthProvider>
  </Provider>,
)
