import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Provider } from 'react-redux';
import store from './store.js';
import { RouterProvider } from 'react-router-dom';
import router from './routes/app-routing.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <Provider store={store}>
    <RouterProvider router = {router}/>
  </Provider>
)
