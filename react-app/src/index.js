import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux"
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App';

import configureStore from "./store";

const store = configureStore();

if (process.env.NODE_ENV !== "production") {

  window.store = store;
  window.sessionActions = sessionActions;
}

function Root() {
  return (
    <Provider store = {store}>
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </Provider>
  )
}


ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
