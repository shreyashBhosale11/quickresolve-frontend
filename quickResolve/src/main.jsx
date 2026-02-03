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
import UserDashboard from './pages/UserDashboard.jsx'
import AgentDashboard from './pages/AgentDashboard.jsx'

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
      path: "/addticket",
      element: (
        <ProtectedRoute allowedRoles={['user']}>
          <TicketForm />
        </ProtectedRoute>
      ),
      },
      {
        path: "/alltickets",
        element: (
          <ProtectedRoute allowedRoles={[ "admin"]}>
            <AllTickets />
          </ProtectedRoute>
        ),
      },
       {
        path: "ticket/:ticketId",
        element: (
          <ProtectedRoute allowedRoles={["user", "agent", "admin"]}>
            <TicketDetailpage />
          </ProtectedRoute>
        ),
      },
      {
        path:"/myTicket",
        element:(
        <ProtectedRoute allowedRoles={["user"]}>
          <MyTickets/>
        </ProtectedRoute>)
      },
       {
        path:"/assignedTicket",
        element:(
        <ProtectedRoute allowedRoles={["agent"]}>
          <MyTickets/>
        </ProtectedRoute>)
      },
      {
        path: "/admin/dashboard",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
       {
        path: "/user/dashboard",
        element: (
          <ProtectedRoute allowedRoles={["user"]}>
            <UserDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/agent/dashboard",
        element: (
          <ProtectedRoute allowedRoles={["agent"]}>
            <AgentDashboard />
          </ProtectedRoute>
        ),
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
