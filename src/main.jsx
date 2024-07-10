import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
 import './index.css'
 import Home from './pages/Home.jsx'
 import Employees from './pages/Employees.jsx'
 import Products from './pages/Products.jsx'
import UserProfile from './pages/UserProfile.jsx'
import { createBrowserRouter } from 'react-router-dom'







const router = createBrowserRouter([
  {

    path: "/",
    element: <App />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/Employees",
        element: <Employees />,
      },
      {
        path: "/Home",
        element: <Home />,
      },
      {
        path: "/Products",
        element: <Products />,
      },
  
    ],
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
