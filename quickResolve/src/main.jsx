import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from '../src/store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import { LogInForm, SigninForm, TicketForm } from './components/index.js'
import TicketCard from './components/TicketCard.jsx'
import AllTickets from './pages/AllTickets.jsx'
import TicketDetailpage from '././pages/TicketDetailPage.jsx'

const router = createBrowserRouter([
  {
    path:'/',
    element: <App/>,
    children : [
      {
        path:'/',
        element:<Home/>
      },
      {
        path: "/signup",
        element: <SigninForm/>
      },{
        path:"/login",
        element:<LogInForm/>
      },
      {
        path:"/Addticket",
        element:<TicketForm/>
      },
      {
        path:"/Alltickets",
        element:<AllTickets/>
      },
      {
        path:"/ticket/:ticketId",
        element:<TicketDetailpage/>
      }
    
      
    ]
  }
])

createRoot(document.getElementById('root')).render(
 <StrictMode>
  <Provider store={store}>
  <RouterProvider router={router}/>
  </Provider>
</StrictMode>
  
)
