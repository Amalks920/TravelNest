import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from 'react-redux';
import store from './services/store.js';
import {persistor} from './services/store.js'
import { PersistGate } from 'redux-persist/integration/react';
import { Suspense } from "react";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
   <ThemeProvider>
   <Suspense fallback={<h1>Loading....</h1>}>
    <App />
   </Suspense>
   </ThemeProvider>
   </PersistGate>
   </Provider>
  </React.StrictMode>,
)
