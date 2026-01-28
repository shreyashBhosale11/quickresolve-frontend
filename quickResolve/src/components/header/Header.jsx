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
      name: "Login",
      slug: "/login",
      active: !authStatus,

    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
     {
      name: "All Ticket",
      slug: "/all-Ticket",
      active: authStatus,
  },
  {
      name: "Add Ticket",
      slug: "/Addticket",
      active: authStatus,
  },
  ]
  return (
    <header className='w-screen  h-[10%] text-center items-center  bg-[#2D3436] text-white flex justify-center '>
          <div className='flex justify-center items-center gap-6'>
            {navItem.map((item)=>item.active &&(
              <div key={item.name}
              >
                <Link
                to={item.slug}
                >
                  <Button text={item.name}/>
                </Link>

              </div>
            ))}

            {authStatus && (
             <LogoutButton/>
            )}
            
             
             
          </div>

        </header>
  )
}

export default Header