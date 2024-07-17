import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './app.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { CreateUser } from './routes/create-user.tsx'
import { CreateEmail } from './routes/create-email.tsx'

const router = createBrowserRouter([
  {
    element: <App/>,
    children:[
      {
        path: "/",
        element: <CreateUser/>
      },
      {
        path: "/createEmail",
        element: <CreateEmail/>
      }

    ]

  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
