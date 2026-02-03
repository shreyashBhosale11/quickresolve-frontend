import React from 'react'
import {Button , LogoutButton} from '../index'
import { useNavigate , Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
function Header() {
  const authStatus = useSelector((state)=>state.auth.status)

  const navigate = useNavigate();

  const navItem =[
    {
      name: "Home",
      slug: "/",
      active : true
    },
    {
      name:"AdminDashboard",
      slug:"/AdminDashboard",
      active: authStatus
    }
    ,
    
     {
      name: "All Tickets",
      slug: "/Alltickets",
      active: authStatus,
  },
  {
      name: "Add Ticket",
      slug: "/Addticket",
      active: authStatus,
  },
  {
    name: "My ticket",
    slug: "/MyTicket",
    active: authStatus,
  }

 
  ]

   const buttonItem = [
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },{
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
  ]

  return (
    <header className="fixed top-0 left-0 z-30 w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo / Brand */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-gray-800">
            QuickResolve
          </span>
        </div>

        {/* Navigation */}
      
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
           {navItem.map((item)=>item.active &&(
              <div key={item.name}
              className="hover:text-gray-900"
              >
                <Link
                to={item.slug}
                >
                  {item.name}
                  
                </Link>

              </div>
            ))}
        </nav>

        {/* Right side (User / Auth actions) */}
        <div className="flex items-center gap-4">
           {buttonItem.map((item)=>item.active &&(
              <div key={item.name} >
            <Link to={item.slug}>
              <Button text={item.name}/>
            </Link>
            </div>
           ))}

           {authStatus && (
            <div>
              <LogoutButton />
            </div>
              )}
        </div>

      </div>
    </header>
  )
}

export default Header


 

