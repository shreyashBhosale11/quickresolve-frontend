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
import MyTickets from './pages/MyTickets.jsx'
import NotFound from './pages/NotFound.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Unauthorized from "./pages/Unauthorized.jsx"
import AdminDashboard from './pages/AdminDashboard.jsx'

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
      path: "/Addticket",
      element: (
        <ProtectedRoute allowedRoles={['user', 'admin']}>
          <TicketForm />
        </ProtectedRoute>
      ),
      },
      {
        path:"/Alltickets",
        element:<AllTickets/>
      },
      {
        path:"/ticket/:ticketId",
        element:<TicketDetailpage/>
      },
      {
        path:"/MyTicket",
        element:<MyTickets/>
      },
      {
        path:"/AdminDashboard",
        element: <AdminDashboard/>
      },


      {
        path:"/unauthorized",
        element:<Unauthorized/>
      },
       {
        path: '*',
        element: <NotFound />,
      },
    
      
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
