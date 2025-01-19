import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
 import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter ,RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import appstore from './Utils/store.js';
import User from './Componets/User/User.js';
import Delivery  from './Componets/Delivery/Delivery.js';
import Home from './Componets/Home.js';

import SalesDash from './Componets/SalesDash.js'; // New import

const route=new createBrowserRouter([
  {
    
    element:<App/>,
    children:[{
      path:"",
      element:<Home/>
  
    },{
      path:"/user",
      element:<User/>
  
    },
   
    {
      path:"/delivery",
      element:<Delivery/>
  
    },
  
    {
      path:"/dashboard/sales",
      element:<SalesDash/> // New route
    }]
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>
   <Provider store={appstore}>
    <RouterProvider router={route} />
   </Provider>
  // </React.StrictMode>
  // <App/>
);

reportWebVitals();
