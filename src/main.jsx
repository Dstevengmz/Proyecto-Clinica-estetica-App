// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthenticaContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import { NotificationUsuarioProvider } from "./contexts/NotificationUsuarioContext";
import "core-js";
import "bootstrap-icons/font/bootstrap-icons.css";
import  CarritoProvider  from "./contexts/CarritoContext";

import App from "./App";
import store from "./store";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AuthProvider>
      <NotificationProvider>
        <NotificationUsuarioProvider>
          <CarritoProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </CarritoProvider>
        </NotificationUsuarioProvider>
      </NotificationProvider>
    </AuthProvider>
  </Provider>
);
